'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  isTeacherPhoneNumber,
  findMatchingSupervisor,
} from '@/lib/attendance.utils';
import { recordTeacherAttendance } from '@/lib/attendance.service';
import type { AttendanceSession, SessionSupervisor } from '@/lib/supabase';

export function useAttendanceRoleDetection(session: AttendanceSession) {
  const [isTeacherDetected, setIsTeacherDetected] = useState(false);
  const [detectedSupervisor, setDetectedSupervisor] = useState<SessionSupervisor | null>(null);

  // Cek apakah HP/perangkat ini sebelumnya sudah terverifikasi sebagai pengawas
  useEffect(() => {
    try {
      const isSupervisorVerified =
        localStorage.getItem(`fka_supervisor_verified_${session.id}`) === 'true';
      const supervisorName = localStorage.getItem(`fka_supervisor_name_${session.id}`);
      const supervisorPhone = localStorage.getItem(`fka_supervisor_phone_${session.id}`);
      if (isSupervisorVerified && supervisorName) {
        setDetectedSupervisor({
          name: supervisorName,
          phone: supervisorPhone || '',
        });
      }
    } catch {}
  }, [session.id]);

  const handleTeacherLogin = useCallback(
    async (phone: string) => {
      try {
        localStorage.setItem(`fka_teacher_verified_${session.id}`, 'true');
        localStorage.setItem(`fka_teacher_phone_${session.id}`, phone);
      } catch {}
      await recordTeacherAttendance(session.id);
      setIsTeacherDetected(true);
    },
    [session.id]
  );

  const handleSupervisorLogin = useCallback(
    (supervisor: SessionSupervisor, phone: string) => {
      try {
        localStorage.setItem(`fka_supervisor_verified_${session.id}`, 'true');
        localStorage.setItem(`fka_supervisor_name_${session.id}`, supervisor.name);
        localStorage.setItem(`fka_supervisor_phone_${session.id}`, phone);
      } catch {}
      setDetectedSupervisor(supervisor);
    },
    [session.id]
  );

  // Memeriksa apakah nomor telepon cocok dengan pengampu atau pengawas
  const checkSpecialRole = useCallback(
    async (formattedPhone: string, rawPhone: string): Promise<'teacher' | 'supervisor' | null> => {
      // 1. Cek Pengampu
      if (
        isTeacherPhoneNumber(
          rawPhone,
          session.teacher_phones,
          session.halaqahs?.teacher_phones
        )
      ) {
        await handleTeacherLogin(formattedPhone);
        return 'teacher';
      }

      // 2. Cek Pengawas
      const matchedSup = findMatchingSupervisor(
        rawPhone,
        session.supervisors,
        session.halaqahs?.supervisors
      );
      if (matchedSup) {
        handleSupervisorLogin(matchedSup, formattedPhone);
        return 'supervisor';
      }

      return null;
    },
    [
      session.teacher_phones,
      session.halaqahs?.teacher_phones,
      session.supervisors,
      session.halaqahs?.supervisors,
      handleTeacherLogin,
      handleSupervisorLogin,
    ]
  );

  return {
    isTeacherDetected,
    detectedSupervisor,
    checkSpecialRole,
  };
}

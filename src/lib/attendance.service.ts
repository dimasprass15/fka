import {
  supabase,
  type AttendanceSession,
  type Student,
  type AttendanceRecord,
  type DynamicFormField,
} from './supabase';

export const DEFAULT_DYNAMIC_FIELDS: DynamicFormField[] = [
  { id: 'phone', label: 'Nomor WhatsApp Santri', type: 'phone', required: true, is_student_phone: true },
  { id: 'name', label: 'Nama Lengkap Santri', type: 'text', required: true, is_student_name: true },
  { id: 'gender', label: 'Kategori Santri', type: 'radio', options: ['Ikhwan (Laki-laki)', 'Akhwat (Perempuan)'], required: true },
];

/**
 * Records teacher presence directly on attendance_sessions.
 */
export async function recordTeacherAttendance(sessionId: string): Promise<void> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const nowIso = new Date().toISOString();
    await supabase
      .from('attendance_sessions')
      .update({
        teacher_joined_at: nowIso,
        teacher_join_date: today,
      })
      .eq('id', sessionId);
  } catch (e) {
    console.warn('Gagal mencatat timestamp kehadiran pengajar:', e);
  }
}

/**
 * Looks up student by sanitized phone number.
 */
export async function lookupStudentByPhone(formattedPhone: string): Promise<Student | null> {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('phone_number', formattedPhone)
    .maybeSingle();
  if (error || !data) return null;
  return data as Student;
}

/**
 * Checks if a student has an existing attendance record today.
 */
export async function checkStudentTodayAttendance(
  sessionId: string,
  studentId: string
): Promise<AttendanceRecord | null> {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('attendance_records')
    .select('*')
    .eq('session_id', sessionId)
    .eq('student_id', studentId)
    .eq('session_date', today)
    .maybeSingle();
  if (error || !data) return null;
  return data as AttendanceRecord;
}

/**
 * Handles reconnecting a student to today's session.
 */
export async function reconnectStudentAttendance(
  recordId: string,
  currentCount: number
): Promise<{ nextReconnect: number; joinTime: string }> {
  const nowIso = new Date().toISOString();
  const nextReconnect = (currentCount || 0) + 1;
  await supabase
    .from('attendance_records')
    .update({
      reconnect_count: nextReconnect,
      zoom_join_time: nowIso,
      zoom_leave_time: null,
    })
    .eq('id', recordId);
  return { nextReconnect, joinTime: nowIso };
}

/**
 * Upserts student, binds to halaqah_members, and creates attendance record.
 */
export async function upsertStudentAndRecord(params: {
  session: AttendanceSession;
  formattedPhone: string;
  fullName: string;
  gender: string;
  existingStudent: Student | null;
  status: 'hadir' | 'terlambat';
  answers: Record<string, string>;
}): Promise<{ student: Student; record: AttendanceRecord }> {
  const { session, formattedPhone, fullName, gender, existingStudent, status, answers } = params;
  let studentObj = existingStudent;

  if (!studentObj) {
    const { data: newStudent, error: studentErr } = await supabase
      .from('students')
      .upsert(
        {
          phone_number: formattedPhone,
          full_name: fullName.trim(),
          gender: gender.toLowerCase().includes('akhwat') ? 'akhwat' : 'ikhwan',
        },
        { onConflict: 'phone_number' }
      )
      .select()
      .single();

    if (studentErr) throw studentErr;
    studentObj = newStudent as Student;
  }

  if (session.halaqah_id) {
    await supabase.from('halaqah_members').upsert(
      {
        halaqah_id: session.halaqah_id,
        student_id: studentObj.id,
        status: 'active',
      },
      { onConflict: 'halaqah_id,student_id' }
    );
  }

  const today = new Date().toISOString().split('T')[0];
  const nowIso = new Date().toISOString();

  const { data: recordData, error: recordErr } = await supabase
    .from('attendance_records')
    .upsert(
      {
        session_id: session.id,
        student_id: studentObj.id,
        session_date: today,
        status,
        web_submitted_at: nowIso,
        zoom_join_time: nowIso,
        reconnect_count: 0,
        notes: JSON.stringify(answers),
      },
      { onConflict: 'session_id,student_id,session_date' }
    )
    .select()
    .single();

  if (recordErr) throw recordErr;

  return { student: studentObj, record: recordData as AttendanceRecord };
}


export type ScheduleGateStatus =
  | 'openValid'
  | 'openLate'
  | 'beforeOpen'
  | 'closed'
  | 'notScheduledToday';

export interface ScheduleWindowResult {
  status: ScheduleGateStatus;
  isOpen: boolean;
  isLate: boolean;
  isBeforeOpen: boolean;
  isClosed: boolean;
  isNotScheduledToday: boolean;
  secondsUntilOpen: number;
  openMinutesBefore: number;
  sessionDurationMinutes: number;
  lateToleranceMinutes: number;
  startFormatted: string;
  openFormatted: string;
  closeFormatted: string;
  nextSessionDescId: string;
  nextSessionDescAr: string;
}

export const DAY_NAMES_ID: Record<number, string> = {
  1: 'Senin',
  2: 'Selasa',
  3: 'Rabu',
  4: 'Kamis',
  5: 'Jumat',
  6: 'Sabtu',
  7: 'Ahad',
};

export const DAY_NAMES_AR: Record<number, string> = {
  1: 'الإثنين',
  2: 'الثلاثاء',
  3: 'الأربعاء',
  4: 'الخميس',
  5: 'الجمعة',
  6: 'السبت',
  7: 'الأحد',
};

function formatTime(hour: number, minute: number): string {
  const h = hour.toString().padStart(2, '0');
  const m = minute.toString().padStart(2, '0');
  return `${h}:${m}`;
}

function findNextActiveDay(currentDay: number, activeDays: number[]): number | null {
  if (!activeDays.length) return null;
  const sorted = [...activeDays].sort((a, b) => a - b);
  for (const d of sorted) {
    if (d > currentDay) return d;
  }
  return sorted[0];
}

export function evaluateScheduleWindow(params: {
  utcHour: number;
  utcMinute: number;
  openMinutesBefore?: number;
  sessionDurationMinutes?: number;
  lateToleranceMinutes?: number;
  activeDays?: number[];
  now?: Date;
}): ScheduleWindowResult {
  const openMinutesBefore = params.openMinutesBefore ?? 15;
  const sessionDurationMinutes = params.sessionDurationMinutes ?? 60;
  const lateToleranceMinutes = params.lateToleranceMinutes ?? 15;
  const activeDays =
    params.activeDays && params.activeDays.length > 0
      ? params.activeDays
      : [1, 2, 3, 4, 5, 6, 7];

  const now = params.now ?? new Date();

  // Convert to UTC+7 (WIB - Standard Timezone of Fastabiqul Khairat Academy)
  const utcMillis = now.getTime() + now.getTimezoneOffset() * 60000;
  const wibDate = new Date(utcMillis + 7 * 3600000);

  // JS getDay(): 0 = Sun, 1 = Mon ... 6 = Sat -> convert to ISO 1 = Mon ... 7 = Sun
  const jsDay = wibDate.getDay();
  const wibDay = jsDay === 0 ? 7 : jsDay;

  const currentSeconds =
    (wibDate.getHours() * 60 + wibDate.getMinutes()) * 60 + wibDate.getSeconds();

  const startHourWib = (params.utcHour + 7) % 24;
  const startMinuteWib = params.utcMinute;
  const startMinutes = startHourWib * 60 + startMinuteWib;
  const startSeconds = startMinutes * 60;

  const openSeconds = startSeconds - openMinutesBefore * 60;
  const lateCutoffSeconds = startSeconds + lateToleranceMinutes * 60;
  const closeSeconds = startSeconds + sessionDurationMinutes * 60;

  const startFormatted = `${formatTime(startHourWib, startMinuteWib)} WIB`;

  const openHour = Math.floor(((openSeconds % 86400) + 86400) % 86400 / 3600);
  const openMin = Math.floor((((openSeconds % 86400) + 86400) % 3600) / 60);
  const openFormatted = `${formatTime(openHour, openMin)} WIB`;

  const closeHour = Math.floor(((closeSeconds % 86400) + 86400) % 86400 / 3600);
  const closeMin = Math.floor((((closeSeconds % 86400) + 86400) % 3600) / 60);
  const closeFormatted = `${formatTime(closeHour, closeMin)} WIB`;

  const isTodayActive = activeDays.includes(wibDay);

  // If today is not in active scheduled days
  if (!isTodayActive) {
    const nextDay = findNextActiveDay(wibDay, activeDays);
    const dayNameId = nextDay ? DAY_NAMES_ID[nextDay] : 'Pekan depan';
    const dayNameAr = nextDay ? DAY_NAMES_AR[nextDay] : 'الأسبوع القادم';

    return {
      status: 'notScheduledToday',
      isOpen: false,
      isLate: false,
      isBeforeOpen: false,
      isClosed: false,
      isNotScheduledToday: true,
      secondsUntilOpen: 0,
      openMinutesBefore,
      sessionDurationMinutes,
      lateToleranceMinutes,
      startFormatted,
      openFormatted,
      closeFormatted,
      nextSessionDescId: `${dayNameId}, pukul ${startFormatted}`,
      nextSessionDescAr: `يوم ${dayNameAr}، الساعة ${formatTime(startHourWib, startMinuteWib)} بتوقيت إندونيسيا`,
    };
  }

  // Today is an active day
  // Case 1: Before gate opens (secondsUntilOpen > 0)
  if (currentSeconds < openSeconds) {
    const diff = openSeconds - currentSeconds;
    return {
      status: 'beforeOpen',
      isOpen: false,
      isLate: false,
      isBeforeOpen: true,
      isClosed: false,
      isNotScheduledToday: false,
      secondsUntilOpen: diff,
      openMinutesBefore,
      sessionDurationMinutes,
      lateToleranceMinutes,
      startFormatted,
      openFormatted,
      closeFormatted,
      nextSessionDescId: `Hari ini, pukul ${startFormatted} (Buka: ${openFormatted})`,
      nextSessionDescAr: `اليوم الساعة ${formatTime(startHourWib, startMinuteWib)} (يفتح: ${formatTime(openHour, openMin)})`,
    };
  }

  // Case 2: Open and on-time
  if (currentSeconds <= lateCutoffSeconds) {
    return {
      status: 'openValid',
      isOpen: true,
      isLate: false,
      isBeforeOpen: false,
      isClosed: false,
      isNotScheduledToday: false,
      secondsUntilOpen: 0,
      openMinutesBefore,
      sessionDurationMinutes,
      lateToleranceMinutes,
      startFormatted,
      openFormatted,
      closeFormatted,
      nextSessionDescId: '',
      nextSessionDescAr: '',
    };
  }

  // Case 3: Open but late tolerance exceeded
  if (currentSeconds <= closeSeconds) {
    return {
      status: 'openLate',
      isOpen: true,
      isLate: true,
      isBeforeOpen: false,
      isClosed: false,
      isNotScheduledToday: false,
      secondsUntilOpen: 0,
      openMinutesBefore,
      sessionDurationMinutes,
      lateToleranceMinutes,
      startFormatted,
      openFormatted,
      closeFormatted,
      nextSessionDescId: '',
      nextSessionDescAr: '',
    };
  }

  // Case 4: Meeting is completely finished (currentSeconds > closeSeconds)
  const nextDay = findNextActiveDay(wibDay, activeDays);
  const isNextDayToday = nextDay === wibDay;
  const dayNameId = isNextDayToday ? 'Pekan depan' : nextDay ? DAY_NAMES_ID[nextDay] : 'Pekan depan';
  const dayNameAr = isNextDayToday ? 'الأسبوع القادم' : nextDay ? DAY_NAMES_AR[nextDay] : 'الأسبوع القادم';

  return {
    status: 'closed',
    isOpen: false,
    isLate: false,
    isBeforeOpen: false,
    isClosed: true,
    isNotScheduledToday: false,
    secondsUntilOpen: 0,
    openMinutesBefore,
    sessionDurationMinutes,
    lateToleranceMinutes,
    startFormatted,
    openFormatted,
    closeFormatted,
    nextSessionDescId: `${dayNameId}, pukul ${startFormatted}`,
    nextSessionDescAr: `يوم ${dayNameAr}، الساعة ${formatTime(startHourWib, startMinuteWib)} بتوقيت إندونيسيا`,
  };
}

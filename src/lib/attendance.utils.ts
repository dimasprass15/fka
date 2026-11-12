/**
 * Pure utility functions for attendance gate, phone number sanitization,
 * Zoom deep-linking, and bilingual (ID/EN + Arabic Fushah) translations.
 */

export type SupportedGateLang = "ID" | "EN";

export interface DualText {
  primary: string;
  ar: string;
}

export function sanitizePhoneNumber(input: string): string {
  let cleaned = input.replace(/[\s\-\(\)]/g, '').trim();

  if (cleaned.startsWith('08')) {
    cleaned = '+62' + cleaned.substring(1);
  } else if (cleaned.startsWith('8')) {
    cleaned = '+62' + cleaned;
  } else if (cleaned.startsWith('62') && !cleaned.startsWith('+62')) {
    cleaned = '+' + cleaned;
  } else if (!cleaned.startsWith('+') && cleaned.length > 0) {
    cleaned = '+' + cleaned;
  }

  return cleaned;
}

/**
 * Sanitizes user input text (strips HTML, JS injection, limits length).
 * Does NOT trim trailing spaces by default so that users can freely type multiple words with spaces.
 * Set `trim = true` during form submission or final validation.
 */
export function sanitizeInputText(input: string, maxLen = 120, trim = false): string {
  if (!input) return "";
  const cleaned = input
    .replace(/<[^>]*>?/gm, "") // Strip HTML/script tags
    .replace(/javascript:/gi, "")
    .replace(/data:/gi, "")
    .slice(0, maxLen);
  return trim ? cleaned.trim() : cleaned;
}

export function buildZoomWebUrl(meetingId: string, passcode: string, uname: string): string {
  const cleanId = meetingId.replace(/[\s\-]/g, '');
  const encodedName = encodeURIComponent(uname.trim());
  const encodedPwd = encodeURIComponent(passcode.trim());
  return `https://zoom.us/j/${cleanId}?pwd=${encodedPwd}&uname=${encodedName}`;
}

export function buildZoomAppUrl(meetingId: string, passcode: string, uname: string): string {
  const cleanId = meetingId.replace(/[\s\-]/g, '');
  const encodedName = encodeURIComponent(uname.trim());
  const encodedPwd = encodeURIComponent(passcode.trim());
  return `zoomus://zoom.us/join?confno=${cleanId}&pwd=${encodedPwd}&uname=${encodedName}`;
}

/**
 * Checks whether an input phone number belongs to the registered instructor/teacher.
 * Matches against teacher_phones from session or halaqah.
 */
export function isTeacherPhoneNumber(
  inputPhone: string,
  sessionTeacherPhones?: string[] | null,
  halaqahTeacherPhones?: string[] | null
): boolean {
  if (!inputPhone) return false;
  const digits = inputPhone.replace(/\D/g, '');
  if (digits.length < 8) return false;

  const phoneList: string[] = [
    ...(sessionTeacherPhones || []),
    ...(halaqahTeacherPhones || []),
  ];

  if (phoneList.length === 0) return false;

  return phoneList.some((tp) => {
    if (!tp) return false;
    const cleanTp = tp.replace(/\D/g, '');
    if (cleanTp.length < 8) return false;
    return digits === cleanTp || digits.endsWith(cleanTp) || cleanTp.endsWith(digits);
  });
}

// Re-export strings, bilingual dictionaries, and Arabic translation helpers
export * from './attendance.strings';
export * from './attendance.arabic';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DynamicFormField {
  id: string;
  label: string;
  type: 'text' | 'phone' | 'textarea' | 'radio' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: string[];
  is_student_name?: boolean;
  is_student_phone?: boolean;
  label_ar?: string;
  placeholder_ar?: string;
}

export interface AttendanceSession {
  id: string;
  halaqah_id: string | null;
  title: string;
  slug: string;
  is_evergreen: boolean;
  zoom_meeting_id: string;
  zoom_passcode: string;
  form_config: {
    form_title?: string;
    form_description?: string;
    submit_button_text?: string;
    allow_excuse?: boolean;
    fields?: DynamicFormField[];
    require_phone?: boolean;
    phone_label?: string;
    phone_placeholder?: string;
    name_label?: string;
    name_placeholder?: string;
    show_gender?: boolean;
    gender_label?: string;
    announcement?: string;
    tracking_mode?: "web_gate" | "zoom_webhook";
    og_image_url?: string;
    late_tolerance_minutes?: number;
  };
  is_active: boolean;
  created_at: string;
  halaqahs?: {
    id: string;
    name: string;
    teacher_name?: string;
    category?: string;
    days_label?: string;
    utc_hour?: number;
    utc_minute?: number;
  };
}

export interface Student {
  id: string;
  full_name: string;
  phone_number: string;
  gender: string;
  email: string | null;
  notes: string | null;
}

export interface AttendanceRecord {
  id: string;
  session_id: string;
  student_id: string;
  session_date: string;
  status: 'hadir' | 'terlambat' | 'izin' | 'sakit' | 'alpa';
  web_submitted_at: string;
  zoom_duration_minutes: number;
  reconnect_count: number;
}


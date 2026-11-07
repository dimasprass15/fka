export interface ProgramRecord {
  id: string;
  slug: string;
  is_standard: boolean;
  category: string;
  status: 'open' | 'closed';
  image_url: string;
  icon_name?: string;

  title_id: string;
  title_ar: string;
  title_en: string;

  subtitle_id: string;
  subtitle_ar: string;
  subtitle_en: string;

  description_id: string;
  description_ar: string;
  description_en: string;

  facilities_id: string[];
  facilities_ar: string[];
  facilities_en: string[];

  requirements_id: string[];
  requirements_ar: string[];
  requirements_en: string[];

  infaq_label_id: string;
  infaq_label_ar: string;
  infaq_label_en: string;
  infaq_amount: number;

  quota: number;
  enrolled: number;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}


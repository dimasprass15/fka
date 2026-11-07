export type KnowledgeType = 'article' | 'audio' | 'video';
export type KnowledgeCategory = 'all' | 'tajwid' | 'quran' | 'mutun' | 'fiqh' | 'daurah' | 'general';

export interface KnowledgePost {
  id: string;
  slug: string;
  type: KnowledgeType;
  category: KnowledgeCategory;
  title_id: string;
  title_ar: string;
  title_en: string;
  excerpt_id?: string;
  excerpt_ar?: string;
  excerpt_en?: string;
  content_markdown_id?: string;
  content_markdown_ar?: string;
  content_markdown_en?: string;
  media_url?: string;
  cover_image_url?: string;
  teacher_name: string;
  teacher_name_ar: string;
  teacher_name_en: string;
  duration_text?: string;
  read_time_minutes?: number;
  is_featured?: boolean;
  is_published?: boolean;
  sort_order?: number;
  view_count?: number;
  created_at?: string;
}


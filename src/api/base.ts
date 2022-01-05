export const BASE_URL = 'http://13.125.229.9:10673';

export interface PageMeta {
  total: number;
  page: number;
  size: number;
  has_next: boolean;
}

export interface Contents {
  content: string;
  id: number;
  user_id: number;
  nickname: string;
  vaccine_round: 'FIRST' | 'SECOND' | 'THIRD';
  vaccine_type: 'ETC' | 'PFIZER' | 'AZ' | 'MODERNA' | 'JANSSEN';
  symptom: Array<{ [key: string]: Array<number> }>;
  like_count: number;
  comment_count: number;
  user_is_like: boolean;
}

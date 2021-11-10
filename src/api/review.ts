import instance from '../utils/fetcher';
import { BASE_URL, Contents, PageMeta } from './base';

const getReview = async (
  pageParam: number,
  filterValue: { [key: string]: string },
): Promise<ReviewResponse> => {
  const filter = Object.entries(filterValue)
    .map(([key, value]) => {
      switch (key) {
        case 'age':
          return value
            ? `min_age=${value}&max_age=${Number(value) + 9}`
            : false;
        case 'sex':
          return value !== ''
            ? value
              ? 'gender=MALE'
              : 'gender=FEMALE'
            : false;
        case 'type':
          return value ? `vaccine_type=${value}` : false;
        case 'cross':
          return value !== '' ? `is_crossed=${value}` : false;
        case 'round':
          return value !== '' ? `round=${value}` : false;
        case 'pregnant':
          return value !== '' ? `is_pregnant=${value}` : false;
        case 'underlying':
          return value !== '' ? `is_underlying_disease=${value}` : false;
      }
    })
    .filter(_filter => _filter);
  const { data } = await instance.get(
    `${BASE_URL}/v1/review?page=${pageParam}&${filter.join('&')}`,
  );

  return data;
};

interface Props {
  survey_type: string;
  survey_details:
    | {
        vaccine_type: string | null;
        vaccine_round: string | null;
        is_crossed: boolean | null;
        is_pregnant: boolean | null;
        is_underlying_disease: boolean | null;
        date_from: string | null;
        data: { [key: string]: any };
      }
    | { [key: string]: any };
}

const postJoinSurvey = async ({ survey_type, survey_details }: Props) => {
  const { data } = await instance.post(`${BASE_URL}/v1/user/join-survey`, {
    survey_type,
    survey_details,
  });

  return data;
};

const postImageUpload = async ({ body }: { body: any }) => {
  console.log(body);
  const { data } = await instance.post('/v1/review/images', body, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  console.log(data);
  return data;
};

const getReviewDetail = async (
  review_id: number,
): Promise<ReviewDetailResponse> => {
  const { data } = await instance.get(`/v1/review/${review_id}`);

  return data;
};

export const reviewApi = {
  getReview,
  postJoinSurvey,
  postImageUpload,
  getReviewDetail,
};

export interface ReviewResponse {
  page_meta: PageMeta;
  contents: Contents[];
}

export interface CommentProps {
  content: string;
  created_at: string;
  id: number;
  is_delete: boolean;
  like_count: number;
  nested_comment: CommentProps[];
  nickname: string;
  user_id: number;
}

export interface ReviewDetailResponse {
  content: string;
  id: number;
  survey: {
    vaccine_type: string;
    vaccine_round: string;
    is_crossed: boolean;
    is_pregnant: boolean;
    is_underlying_disease: boolean;
    date_from: string;
    data: { [key: string]: any };
  };
  is_writer: boolean;
  user_id: number;
  nickname: string;
  comments: CommentProps[];
  keywords: string[];
  comment_count: number;
  like_count: number;
  images: string[] | null;
}

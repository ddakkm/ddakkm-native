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
            ? value === 'MALE'
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
  review_detail?: {
    content?: string;
    keywords?: string[];
    images?: {
      image1_url: 'string';
      image2_url: 'string';
      image3_url: 'string';
    } | null;
  };
}

const postJoinSurvey = async ({
  survey_type,
  survey_details,
  review_detail,
}: Props) => {
  const { data } = await instance.post(`${BASE_URL}/v1/user/join-survey`, {
    survey_type,
    survey_details,
    review_detail,
  });

  return data;
};

interface SurveyReviewProps {
  content?: string;
  survey: {
    vaccine_type: string | null;
    vaccine_round: string | null;
    is_crossed: boolean | null;
    is_pregnant: boolean | null;
    is_underlying_disease: boolean | null;
    date_from: string | null;
    data: { [key: string]: any };
  };
  keywords?: string[];
  images?: {
    image1_url: 'string';
    image2_url: 'string';
    image3_url: 'string';
  } | null;
}

const postSurveyReview = async (body: SurveyReviewProps) => {
  const { data } = await instance.post('/v1/review', body);
  return data;
};

const postImageUpload = async ({ body }: { body: any }) => {
  const { data } = await instance.post('/v1/review/images', body, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return data;
};

const getReviewDetail = async (
  review_id: number,
): Promise<ReviewDetailResponse> => {
  const { data } = await instance.get(`/v1/review/${review_id}`);

  return data;
};

const postReviewLikeStatus = async (review_id: number) => {
  const { data } = await instance.post(`/v1/review/${review_id}/like_status`);
  return data;
};

const postComment = async ({
  review_id,
  content,
}: {
  review_id: number;
  content: string;
}) => {
  const { data } = await instance.post(`/v1/review/${review_id}/comment`, {
    content,
  });
  return data;
};

const postReplyComment = async ({
  comment_id,
  content,
}: {
  comment_id: number;
  content: string;
}) => {
  const { data } = await instance.post(`/v1/comment/${comment_id}`, {
    content,
  });
  return data;
};

export interface Comment {
  content: string;
  id: number;
  user_id: number;
  nickname: string;
  like_count: number;
  created_at: string;
  is_delete: boolean;
  user_is_like: boolean;
  user_is_writer: boolean;
  nested_comment: ReComment[];
}

interface ReComment {
  content: string;
  id: number;
  user_id: number;
  nickname: string;
  like_count: number;
  created_at: string;
  is_delete: boolean;
  user_is_like: boolean;
  user_is_writer: boolean;
}

const getCommentList = async (review_id: number) => {
  const { data } = await instance.get<{
    comment_list: Comment[];
    comment_count: number;
  }>(`/v1/comment/${review_id}`);
  return data;
};

const getReplyComment = async (comment_id: number) => {
  const { data } = await instance.get<Comment>(
    `/v1/comment/${comment_id}/tree`,
  );
  return data;
};

const deleteComment = async (comment_id: number) => {
  const { data } = await instance.delete(`/v1/comment/${comment_id}`);
  return data;
};

const updateComment = async ({
  comment_id,
  content,
}: {
  comment_id: number;
  content: string;
}) => {
  const { data } = await instance.patch(`/v1/comment/${comment_id}`, {
    content,
  });
  return data;
};

const postReportComment = async ({
  comment_id,
  reason,
}: {
  comment_id: number;
  reason: number;
}) => {
  const { data } = await instance.post(`/v1/comment/${comment_id}/report`, {
    reason,
  });
  return data;
};

const postLikeComment = async ({ comment_id }: { comment_id: number }) => {
  const { data } = await instance.post(`/v1/comment/${comment_id}/like_status`);
  return data;
};

const getCommentContent = async ({ comment_id }: { comment_id: number }) => {
  const { data } = await instance.get(`/v1/comment/${comment_id}/content`);
  return data;
};

const getReviewContent = async ({ review_id }: { review_id: number }) => {
  const { data } = await instance.get(`/v1/review/${review_id}/content`);
  return data;
};

const updateReviewContent = async ({
  review_id,
  body,
}: {
  review_id: number;
  body: {
    content?: string;
    keywords?: string[];
    images?: { [key: string]: string };
  };
}) => {
  const { data } = await instance.patch(`/v1/review/${review_id}`, body);
  return data;
};

const deleteReview = async ({ review_id }: { review_id: number }) => {
  const { data } = await instance.delete(`/v1/review/${review_id}`);
  return data;
};

const reportReview = async ({
  review_id,
  reason,
}: {
  review_id: number;
  reason: number;
}) => {
  const { data } = await instance.post(`/v1/review/${review_id}/report`, {
    reason,
  });
  return data;
};

const reportComment = async ({
  comment_id,
  reason,
}: {
  comment_id: number;
  reason: number;
}) => {
  const { data } = await instance.post(`/v1/comment/${comment_id}/report`, {
    reason,
  });
  return data;
};

export const reviewApi = {
  getReview,
  postJoinSurvey,
  postImageUpload,
  getReviewDetail,
  postReviewLikeStatus,
  postSurveyReview,
  getCommentList,
  postComment,
  postReplyComment,
  getReplyComment,
  deleteComment,
  updateComment,
  postReportComment,
  postLikeComment,
  getCommentContent,
  getReviewContent,
  updateReviewContent,
  deleteReview,
  reportReview,
  reportComment,
};

export interface ReviewLikeResponse {
  status: string;
}

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
  user_is_like: boolean;
}

import axios from 'axios';
import instance from '../utils/fetcher';
import { BASE_URL } from './base';

const getProfile = async (): Promise<ProfileResponse> => {
  const { data } = await instance.get('/v1/user/me/profile');
  return data;
};

const getMyLikePost = async () => {
  const { data } = await instance.get('/v1/user/me/like');
  return data;
};

interface MyPostResponse {
  comment_count: number;
  like_count: number;
  created_at: string;
  id: number;
  nickname: string;
  vaccine_status: {
    details: {
      is_crossed: boolean;
      vaccine_round: string;
      vaccine_type: string;
    };
  };
}

const getMyPost = async (): Promise<MyPostResponse[]> => {
  const { data } = await instance.get('/v1/user/me/post');
  return data;
};

interface GetMyPushProps {
  agree_activity_push: boolean;
  agree_keyword_push: boolean;
}

const getMyPush = async () => {
  const { data } = await instance.get<GetMyPushProps>('/v1/user/me/push');
  return data;
};

const postKeywordPush = async () => {
  const { data } = await instance.post('/v1/user/push/keyword');
  return data;
};

const postActivityPush = async () => {
  const { data } = await instance.post('/v1/user/push/activity');
  return data;
};

const getKeyword = async () => {
  const { data } = await instance.get<string[]>('/v1/user/keyword');
  return data;
};

const postKeyword = async ({ keywords }: { keywords: string[] }) => {
  const { data } = await instance.post('/v1/user/keyword', { keywords });
  return data;
};

interface OtherProfileResponse {
  id: number;
  character_image: string;
  comment_counts: number;
  like_counts: number;
  nickname: string;
  post_counts: number;
  vaccine_status: {
    details: {
      is_crossed: boolean;
      vaccine_round: string;
      vaccine_type: string;
    };
  };
  created_at: string;
}

const getOtherProfile = async (
  user_id: number,
): Promise<OtherProfileResponse> => {
  const { data } = await axios.get(`${BASE_URL}/v1/user/${user_id}/profile`);
  return data;
};

interface OtherPost {
  comment_count: number;
  like_count: number;
  created_at: string;
  id: number;
  nickname: string;
  vaccine_status: {
    details: {
      is_crossed: boolean;
      vaccine_round: string;
      vaccine_type: string;
    };
  };
}

const getOtherPost = async (user_id: number): Promise<OtherPost[]> => {
  const { data } = await axios.get(`${BASE_URL}/v1/user/${user_id}/post`);
  return data;
};

const deleteDeactiveUser = async () => {
  const { data } = instance.delete('/v1/auth/deactive');
  return data;
};

export const userApi = {
  getProfile,
  getKeyword,
  postKeyword,
  getOtherProfile,
  getOtherPost,
  getMyLikePost,
  getMyPost,
  getMyPush,
  postKeywordPush,
  postActivityPush,
  deleteDeactiveUser,
};

interface ProfileResponse {
  character_image: string;
  nickname: string;
  vaccine_status: {
    details: {
      is_crossed: boolean;
      vaccine_round: string;
      vaccine_type: string;
    } | null;
    join_survey_code: string;
  };
  comment_counts: number;
  post_counts: number;
  like_counts: number;
}

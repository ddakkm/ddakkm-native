import axios from 'axios';
import instance from '../utils/fetcher';
import { BASE_URL } from './base';

const login = async (
  sns_provider: 'KAKAO' | 'NAVER',
  sns_access_token: string,
  fcm_token?: string,
) => {
  const body: any = {
    sns_provider,
    sns_access_token,
  };

  if (fcm_token) {
    body['fcm_token'] = fcm_token;
  }
  return await axios.post<LoginResponse>(`${BASE_URL}/v1/auth/login`, body);
};

const signUp = async (
  sns_provider: 'KAKAO' | 'NAVER',
  sns_access_token: string,
  gender: string,
  age: number,
  fcm_token?: string,
) => {
  const body: any = {
    oauth_in: {
      sns_provider,
      sns_access_token,
    },
    user_in: {
      gender,
      age,
      agree_policy: true,
    },
  };

  if (fcm_token) {
    body.oauth_in['fcm_token'] = fcm_token;
  }
  return axios.post(`${BASE_URL}/v1/auth/sign-up`, body);
};

const isJoinSurvey = async () => {
  return instance.get('/v1/user/join-survey');
};

export const authApi = {
  login,
  signUp,
  isJoinSurvey,
};

interface LoginResponse {
  access_token: string;
  done_survey: boolean;
  is_user: boolean;
  nickname: string;
}

import axios from 'axios';
import { BASE_URL } from './base';

const login = async (
  sns_provider: 'KAKAO' | 'NAVER',
  sns_access_token: string,
) => {
  return axios.post(`${BASE_URL}/v1/auth/login`, {
    sns_provider,
    sns_access_token,
  });
};

const signUp = async (
  sns_provider: 'KAKAO' | 'NAVER',
  sns_access_token: string,
  gender: string,
  age: number,
) => {
  return axios.post(`${BASE_URL}/v1/auth/sign-up`, {
    oauth_in: {
      sns_provider,
      sns_access_token,
    },
    user_in: {
      gender,
      age,
      agree_policy: true,
    },
  });
};

export const authApi = {
  login,
  signUp,
};

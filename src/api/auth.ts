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

export const authApi = {
  login,
};

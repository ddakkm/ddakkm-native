import { readTokens } from '../contexts/auth/storage';
import axios, { AxiosRequestConfig } from 'axios';

export const axiosGlobalConfig: AxiosRequestConfig = {
  baseURL: 'http://3.34.44.39',
};

const instance = axios.create(axiosGlobalConfig);

const onRequest = async (
  config?: AxiosRequestConfig,
): Promise<AxiosRequestConfig> => {
  const { accessToken } = (await readTokens()) || {};

  return {
    ...config,
    headers: {
      ...config?.headers,
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
  };
};

instance.interceptors.request.use(onRequest);

export default instance;

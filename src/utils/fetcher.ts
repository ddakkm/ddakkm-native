import { useAppNav } from './../hooks/useNav';
import { readTokens } from '../contexts/auth/storage';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const axiosGlobalConfig: AxiosRequestConfig = {
  baseURL: 'http://13.125.229.9:10673',
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

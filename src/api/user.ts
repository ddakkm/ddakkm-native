import instance from '../utils/fetcher';

const getProfile = async () => {
  const { data } = await instance.get('/v1/user/me/profile');
  return data;
};

export const userApi = {
  getProfile,
};

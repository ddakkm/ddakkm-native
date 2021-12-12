import React, { createContext, FC, useContext, useState } from 'react';
import { userApi } from '../../api/user';

interface LikeReviewHash {
  [id: string]: boolean;
}

interface LikeStoreContext {
  fetchList: () => void;
  updateLikeReview: (review_id: string, is_like: boolean) => void;
  checkLikeReview: (review_id: string) => boolean;
}

const LikeStore = () => {
  const [like_hash, setLikeHash] = useState<LikeReviewHash>({});
  console.log(like_hash);
  const fetchList = async () => {
    try {
      const data = await userApi.getMyLikePost();
      setLikeHash(
        data.reduce((acc, cur) => {
          acc[cur] = true;
          return acc;
        }, {}),
      );
    } catch (e) {}
  };

  const updateLikeReview = (review_id: string, is_like: boolean) => {
    if (is_like) {
      const next_like_hash = { ...like_hash };
      next_like_hash[review_id] = true;
      setLikeHash(next_like_hash);
    } else {
      const next_like_hash = { ...like_hash };
      next_like_hash[review_id] = false;
      setLikeHash(next_like_hash);
    }
  };

  const checkLikeReview = (review_id: string): boolean => {
    return like_hash[review_id];
  };

  return { fetchList, updateLikeReview, checkLikeReview };
};

const Context = createContext<LikeStoreContext>({} as LikeStoreContext);

const Provider: FC = ({ children }) => (
  <Context.Provider value={LikeStore()}>{children}</Context.Provider>
);

export default Provider;

export const useMyLikeList = () => useContext(Context);

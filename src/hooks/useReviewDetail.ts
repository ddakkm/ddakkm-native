import { useQuery } from 'react-query';
import { reviewApi } from '../api/review';

const INITIAL_DATA = {
  content: '',
  id: 0,
  survey: {
    vaccine_type: '',
    vaccine_round: '',
    is_crossed: false,
    is_pregnant: false,
    is_underlying_disease: false,
    date_from: '',
    data: {},
  },
  is_writer: false,
  user_id: 0,
  nickname: '',
  comments: [],
  keywords: [],
  comment_count: 0,
  like_count: 0,
  images: null,
  user_is_like: false,
};

export default function useReviewDetail(review_id: number) {
  const { isLoading, data, isError } = useQuery(
    ['review_detail', review_id],
    () => reviewApi.getReviewDetail(review_id),
    {
      initialData: INITIAL_DATA,
      onError: e => {
        console.log(e);
      },
    },
  );
  return { isLoading, data, isError };
}

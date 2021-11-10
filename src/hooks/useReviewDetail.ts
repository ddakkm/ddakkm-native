import { useQuery } from 'react-query';
import { reviewApi } from '../api/review';

export default function useReviewDetail(review_id: number) {
  const { isLoading, data, isError } = useQuery(
    [review_id],
    () => reviewApi.getReviewDetail(review_id),
    {
      onError: e => {
        console.log(e);
      },
    },
  );
  return { isLoading, data, isError };
}

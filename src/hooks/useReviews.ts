import { useInfiniteQuery } from 'react-query';
import { reviewApi, ReviewResponse } from '../api/review';

export default function useReviews(filterValue: { [key: string]: string }) {
  const { isLoading, data, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery<ReviewResponse>(
      ['review_list', filterValue],
      ({ pageParam = 1 }) => reviewApi.getReview(pageParam, filterValue),
      {
        getNextPageParam: ({ page_meta: { has_next, page } }) => {
          return has_next ? page + 1 : null;
        },
        onError: e => {
          console.log(e);
        },
      },
    );

  return { isLoading, data, hasNextPage, fetchNextPage, refetch };
}

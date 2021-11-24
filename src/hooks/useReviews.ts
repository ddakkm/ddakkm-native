import { useInfiniteQuery } from 'react-query';
import { reviewApi } from '../api/review';

export default function useReviews(filterValue: { [key: string]: string }) {
  const { isLoading, isFetching, data, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery(
      ['review_list', filterValue],
      async ({ pageParam = 1 }) => {
        const { contents, page_meta } = await reviewApi.getReview(
          pageParam,
          filterValue,
        );
        const next_page_index = page_meta.has_next
          ? pageParam + 1
          : page_meta.has_next;
        return {
          review_list: contents,
          next_page_index,
        };
      },
      {
        getNextPageParam: last_page => last_page.next_page_index,
        onError: e => {
          console.log(e);
        },
        retry: false,
        staleTime: Infinity,
      },
    );

  return { isLoading, isFetching, data, hasNextPage, fetchNextPage, refetch };
}

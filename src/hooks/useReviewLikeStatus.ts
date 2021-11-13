import { ReviewResponse } from './../api/review';
import { useAppNav } from './useNav';
import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import { reviewApi } from '../api/review';

export default function useReviewLikeStatus() {
  const queryClient = useQueryClient();
  const { navigate } = useAppNav();

  return useMutation(
    ({ review_id }: { review_id: number }) =>
      reviewApi.postReviewLikeStatus(review_id),
    {
      onMutate: async ({ review_id }) => {
        await queryClient.cancelQueries(['review_list']);
        const previousReviews = queryClient.getQueryData<
          InfiniteData<ReviewResponse>
        >(['review_list'], {
          exact: false,
        });
        if (previousReviews && previousReviews.pages) {
          const newPagesArray =
            previousReviews.pages.map(page => ({
              contents: page.contents.map(content => {
                if (content.id === review_id) {
                  return {
                    ...content,
                    user_is_like: !content.user_is_like,
                    like_count: content.user_is_like
                      ? content.like_count - 1
                      : content.like_count + 1,
                  };
                }
                return content;
              }),
              page_meta: page.page_meta,
            })) ?? [];
          queryClient.setQueriesData<InfiniteData<ReviewResponse>>(
            ['review_list'],
            data => {
              return {
                pages: newPagesArray,
                pageParams: data?.pageParams || [],
              };
            },
          );
          return { previousReviews, newLike: review_id };
        }
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      // eslint-disable-next-line handle-callback-err
      onError: (err, variables, context) => {
        if (context?.previousReviews) {
          queryClient.setQueryData<InfiniteData<ReviewResponse>>(
            ['review_list'],
            context.previousReviews,
          );
        }
      },
      // Always refetch after error or success:
      onSettled: () => {
        // queryClient.invalidateQueries('review_list');
        queryClient.invalidateQueries('review_detail');
      },
    },
  );
}

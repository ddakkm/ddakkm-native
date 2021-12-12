import { ReviewResponse } from './../api/review';
import { useAppNav } from './useNav';
import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import { reviewApi } from '../api/review';

export default function useReviewLikeStatus() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ review_id }: { review_id: number }) =>
      reviewApi.postReviewLikeStatus(review_id),
    {
      onMutate: async ({ review_id }) => {
        await queryClient.cancelQueries(['review_list']);
        const previousReviews = queryClient.getQueryData(['review_list'], {
          exact: false,
        });
        if (previousReviews && previousReviews.pages) {
          const newPagesArray =
            previousReviews.pages.map(page => {
              const contents = page.review_list.map(content => {
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
              });

              return {
                review_list: contents,
                next_page_index: page.next_page_index,
              };
            }) ?? [];
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
          queryClient.setQueriesData<InfiniteData<ReviewResponse>>(
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

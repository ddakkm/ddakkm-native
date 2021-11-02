import { BASE_URL, Contents, PageMeta } from './base';

const getReview = () =>
  fetch(`${BASE_URL}/v1/review?page=1`).then(res => res.json());

export const reviewApi = {
  getReview,
};

export interface ReviewResponse {
  page_meta: PageMeta;
  contents: Contents[];
}

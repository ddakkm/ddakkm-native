import { BASE_URL, Contents, PageMeta } from './base';

const getReview = (
  pageParam: number,
  filterValue: { [key: string]: string },
) => {
  const filter = Object.entries(filterValue)
    .map(([key, value]) => {
      switch (key) {
        case 'age':
          return value
            ? `min_age=${value}&max_age=${Number(value) + 9}`
            : false;
        case 'sex':
          return value !== ''
            ? value
              ? 'gender=MALE'
              : 'gender=FEMALE'
            : false;
        case 'type':
          return value ? `vaccine_type=${value}` : false;
        case 'cross':
          return value !== '' ? `is_crossed=${value}` : false;
        case 'round':
          return value !== '' ? `round=${value}` : false;
        case 'pregnant':
          return value !== '' ? `is_pregnant=${value}` : false;
        case 'underlying':
          return value !== '' ? `is_underlying_disease=${value}` : false;
      }
    })
    .filter(_filter => _filter);

  return fetch(
    `${BASE_URL}/v1/review?page=${pageParam}&${filter.join('&')}`,
  ).then(res => res.json());
};

export const reviewApi = {
  getReview,
};

export interface ReviewResponse {
  page_meta: PageMeta;
  contents: Contents[];
}

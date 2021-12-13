import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(updateLocale);
dayjs.extend(relativeTime);

dayjs.updateLocale('en', {
  relativeTime: {
    future: '%s',
    past: '%s초 전',
    s: '1초 전',
    m: '1분 전',
    mm: '%d분 전',
    h: '1시간 전',
    hh: '%d시간 전',
    d: '1일 전',
    dd: '%d일 전',
    M: '1달 전',
    MM: '%d달 전',
    y: '1년 전',
    yy: '%d년 전',
  },
});

export const getTime = (created_at: string) => {
  return dayjs().from(dayjs(created_at));
};

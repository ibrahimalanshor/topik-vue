import dayjs from 'dayjs';

export function isSameDay(fdate, sdate) {
  return dayjs(fdate).isSame(sdate, 'day');
}

export function formatDate(date, format = null) {
  return dayjs(date).format(format);
}

export function isLowerThanNow(date) {
  return dayjs(date).isBefore(dayjs());
}

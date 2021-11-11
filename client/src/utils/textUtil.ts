const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

const MONTH_NAME: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const getConventionalHour = (hour: number): string => {
  if (hour < 12) {
    return `${hour}`;
  }
  if (hour === 12) {
    return '12';
  }
  if (hour < 23) {
    return `${hour - 12}`;
  } else {
    return '0';
  }
};

const textUtil = {
  timeToString: (targetDate: Date): string => {
    const target = new Date(targetDate.toString());
    const now = new Date();

    const [targetTime, nowTime] = [target.getTime(), now.getTime()];

    const diff = nowTime - targetTime;

    if (diff < 0) {
      return 'Something wrong';
    }
    if (diff < MINUTE) {
      return 'just now';
    }
    if (diff < HOUR) {
      return `${Math.floor(diff / MINUTE)}m`;
    }
    if (diff < DAY) {
      return `${Math.floor(diff / HOUR)}h`;
    }
    if (diff < WEEK) {
      return `${Math.floor(diff / DAY)}d`;
    }
    if (target.getFullYear() !== now.getFullYear()) {
      return `${
        MONTH_NAME[target.getMonth()]
      } ${target.getDate()}, ${target.getFullYear()}`;
    } else {
      return `${
        MONTH_NAME[target.getMonth()]
      } ${target.getDate()} at ${getConventionalHour(
        target.getHours()
      )}:${target.getMinutes().toString().padStart(2, '0')} ${
        target.getHours() < 12 ? 'AM' : 'PM'
      }`;
    }
  },

  getByteLength: (s: string) => {
    let b = 0;
    let i = 0;
    let c = 0;

    for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
    return b;
  }
};

export default textUtil;

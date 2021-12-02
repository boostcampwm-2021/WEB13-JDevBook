const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

const MONTH_NAME: string[] = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

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

    if (diff < MINUTE) {
      return '방금 전';
    }
    if (diff < HOUR) {
      return `${Math.floor(diff / MINUTE)}분 전`;
    }
    if (diff < DAY) {
      return `${Math.floor(diff / HOUR)}시간 전`;
    }
    if (diff < WEEK) {
      return `${Math.floor(diff / DAY)}일 전`;
    }
    if (target.getFullYear() !== now.getFullYear()) {
      return `${MONTH_NAME[target.getMonth()]} ${target.getDate()}, ${target.getFullYear()}`;
    } else {
      return `${MONTH_NAME[target.getMonth()]} ${target.getDate()} at ${getConventionalHour(target.getHours())}:${target
        .getMinutes()
        .toString()
        .padStart(2, '0')} ${target.getHours() < 12 ? 'AM' : 'PM'}`;
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

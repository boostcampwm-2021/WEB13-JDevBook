export interface GnbProps {
  type?: string;
  rightModalType?: string;
}

export interface FlexProps {
  center?: boolean;
}

export interface TabProps {
  current?: boolean;
}

export interface IconProps {
  img: any;
}

export interface RightModalProps {
  [key: string]: boolean;
  rightModalFlag: boolean;
  messageFlag: boolean;
  alarmFlag: boolean;
  selectorFlag: boolean;
}

export interface SearchedUser {
  idx: number;
  nickname: string;
  profile: string;
}

export interface SearchedUserProps {
  user: SearchedUser;
}

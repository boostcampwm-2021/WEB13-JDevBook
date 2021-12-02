import { atom } from 'recoil';

import { Alert, Page } from 'types/common';

export const modalStateStore = atom({
  key: 'modalState',
  default: {
    searchUser: false,
    post: {
      writer: false,
      inPhoto: false,
      index: -1,
      isEnroll: true
    },
    editProfile: false
  }
});

export const isLoginfailStates = atom({
  key: 'isLoginfail',
  default: false as boolean
});

export const currentPageStates = atom({
  key: 'currentPageState',
  default: Page.LOGIN
});

export const rightModalStates = atom({
  key: 'rightModalState',
  default: {
    rightModalFlag: false,
    messageFlag: false,
    alarmFlag: false,
    selectorFlag: false
  }
});

export const alertState = atom<Alert>({
  key: 'alertState',
  default: {
    isAlert: false,
    comment: '',
    modalState: false
  }
});

export const timeOutValueState = atom({
  key: 'timeOutValueState',
  default: 0
});

export const loginState = atom({
  key: 'loginState',
  default: [] as string[]
});

export const alarmState = atom({
  key: 'alarm',
  default: 0 as number
});

export const themeState = atom<string>({
  key: 'theme',
  default: 'light'
});

export const commonState = atom<boolean>({
  key: 'common',
  default: false
});

import { atom } from 'recoil';

import { IGroup } from 'types/group';

export const GroupNavState = atom({
  key: 'GroupNavState',
  default: {
    about: true,
    problem: false,
    groupChat: false
  }
});

export const groupListState = atom<IGroup[]>({
  key: 'groupListState',
  default: []
});

export const groupState = atom<IGroup>({
  key: 'groupState',
  default: {
    idx: 0,
    title: '',
    description: '',
    cover: ''
  }
});

export const usersNumState = atom<number>({
  key: 'number of usres',
  default: 0
});

import socket from 'components/common/Socket';
import { atom } from 'recoil';
import { Socket } from 'socket.io-client';

import { Alert } from 'types/common';
import { IGroup } from 'types/group';
import { PostData } from 'types/post';
import { SolvedRates, IProfile } from 'types/user';
import { ISolvedProblem } from 'types/problem';

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

export const userDataStates = atom({
  key: 'userData',
  default: {
    idx: -1,
    name: '',
    profile: '' as string,
    cover: '' as string,
    bio: '' as string,
    login: false
    // CUD는 필요할 때 DB에서 쓰자.
  }
});

export const isLoginfailStates = atom({
  key: 'isLoginfail',
  default: false as boolean
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

export const usersocketStates = atom({
  key: 'socket',
  default: socket as Socket
  //default: null as Socket | null
});

export const chatWith = atom({
  key: 'getReceiver',
  default: '' as string
});

export const imageViewerState = atom<{
  isOpen: boolean;
  imageCount: number;
  currentIdx: number;
  images: (string | never)[];
}>({
  key: 'imageViewerState',
  default: {
    isOpen: false,
    imageCount: 0,
    currentIdx: 0,
    images: []
  }
});

export const postModalDataStates = atom<PostData>({
  key: 'postModalData',
  default: {
    idx: 0,
    useridx: 0,
    secret: false,
    contents: '',
    likenum: 0,
    commentnum: 0,
    likeFlag: false,
    picture1: null,
    picture2: null,
    picture3: null,
    BTUseruseridx: {
      bio: null,
      idx: 0,
      nickname: '',
      profile: null
    },
    createdAt: new Date()
  }
});

export const postListStore = atom<PostData[]>({
  key: 'postList',
  default: []
});

export const CommentState = atom({
  key: 'commentsFlag',
  default: false as boolean
});

export const GroupNavState = atom({
  key: 'GroupNavState',
  default: {
    about: true,
    problem: false,
    groupChat: false
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
export const solvedProblemState = atom<ISolvedProblem[]>({
  key: 'solvedProblem',
  default: []
});

export const isImgUploadingState = atom({
  key: 'isImgUploading',
  default: 0
});

export const rateState = atom<SolvedRates>({
  key: 'rateState',
  default: {
    prevRate: 0,
    solvedRate: 0,
    totalProblemsCount: 0
  }
});

export const myJoinedGroupState = atom<number[] | null>({
  key: 'myJoinedGroup',
  default: null
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

export const uploadImgList = atom({
  key: 'uploadImgList',
  default: [] as string[]
});

export const profileState = atom<IProfile>({
  key: 'profileState',
  default: {
    idx: 0,
    nickname: '',
    cover: null,
    bio: null
  }
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

export const animationState = atom<boolean>({
  key: 'animation',
  default: true
});

export const usersNumState = atom<number>({
  key: 'number of usres',
  default: 0
});
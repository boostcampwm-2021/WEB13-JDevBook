import socket from 'components/common/Socket';
import { atom } from 'recoil';
import { Socket } from 'socket.io-client';

import { PostAddData, PostData } from 'utils/types';

export const modalVisibleStates = atom({
  key: 'modalVisibleState',
  default: {
    searchUser: false,
    postWriter: false,
    postInPhoto: false,
    postOption: -1
  }
});

export const userData = atom({
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

export const isLoginfail = atom({
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

export const usersocket = atom({
  key: 'socket',
  default: socket as Socket
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

export const postWriterData = atom<PostAddData>({
  key: 'postWriterData',
  default: {
    useridx: -1,
    secret: false,
    likenum: 0,
    contents: '',
    picture1: null,
    picture2: null,
    picture3: null
  }
});

export const postListStore = atom<PostData[]>({
  key: 'postList',
  default: []
});

export const CommentState = atom({
  key: 'commentsFlag',
  default: false as boolean
})

import socket from 'components/common/Socket';

import { atom } from 'recoil';

import { Socket } from 'socket.io-client';

export const usersocketStates = atom({
  key: 'socket',
  default: socket as Socket
});

export const chatWith = atom({
  key: 'getReceiver',
  default: '' as string
});

export const CommentState = atom({
  key: 'commentsFlag',
  default: false as boolean
});

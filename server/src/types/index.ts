import {
  DBUser,
  DBUserGroup,
  DBGroup,
  DBChat,
  DBPost,
  DBLike,
  DBComment,
  DBAlarm,
  DBGroupChat,
  DBProblem,
  DBUserProblem
} from './database';

import {
  PostUpdateData,
  PostAddData,
  CommentData,
  IComment,
  IGroup,
  IUserSocket,
  IProfile
} from './customType';

declare module 'express-session' {
  interface Session {
    username: string;
    useridx: number;
    jwt: string;
  }
}

declare module 'socket.io' {
  interface Socket {
    name: string;
    get: boolean;
  }
}

export {
  DBUser,
  DBUserGroup,
  DBGroup,
  DBChat,
  DBPost,
  DBLike,
  DBComment,
  DBAlarm,
  DBGroupChat,
  DBProblem,
  DBUserProblem,
  PostUpdateData,
  PostAddData,
  CommentData,
  IComment,
  IGroup,
  IUserSocket,
  IProfile
};

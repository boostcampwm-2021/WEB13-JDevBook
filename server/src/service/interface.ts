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
  }
}

interface DBCUD {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface DBUser extends DBCUD {
  idx: number;
  nickname: string;
  profile: string;
  cover: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface DBUserGroup extends DBCUD {
  idx: number;
  useridx: number;
  groupidx: number;
}

export interface DBGroup extends DBCUD {
  idx: number;
  title: string;
  description: string;
  cover: string;
}

export interface DBChat extends DBCUD {
  idx: number;
  senderidx: number;
  receiveridx: number;
  content: string;
}

export interface DBPost extends DBCUD {
  idx: number;
  useridx: number;
  secret: boolean;
  likenum: number;
  contents: string;
  picture1: string;
  picture2: string;
  picture3: string;
}

export interface DBLike extends DBCUD {
  idx: number;
  useridx: number;
  postidx: number;
}

export interface DBComment extends DBCUD {
  idx: number;
  postidx: number;
  useridx: number;
  comments: string;
}

export interface DBAlarm extends DBCUD {
  idx: number;
  useridx: number;
  message: string;
}

export interface DBGroupChat extends DBCUD {
  idx: number;
  groupidx: number;
  useridx: number;
  content: string;
}

export interface DBProblem extends DBCUD {
  idx: number;
  groupidx: number;
  question: string;
  answer: boolean;
}

export interface DBUserProblem extends DBCUD {
  idx: number;
  useridx: number;
  problemidx: number;
  correct: boolean;
}

export interface PostUpdateData {
  secret: number;
  contents: string;
  picture1: string | null;
  picture2: string | null;
  picture3: string | null;
}

export interface PostAddData extends PostUpdateData {
  useridx: number;
  likenum: number;
}

export interface CommentData {
  postidx: number;
  useridx: number;
  comments: string;
}

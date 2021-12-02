interface DBCUD {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

interface DBUser extends DBCUD {
  idx: number;
  nickname: string;
  profile: string;
  cover: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

interface DBUserGroup extends DBCUD {
  idx: number;
  useridx: number;
  groupidx: number;
}

interface DBGroup extends DBCUD {
  idx: number;
  title: string;
  description: string;
  cover: string;
}

interface DBChat extends DBCUD {
  idx: number;
  senderidx: number;
  receiveridx: number;
  content: string;
}

interface DBPost extends DBCUD {
  idx: number;
  useridx: number;
  secret: boolean;
  likenum: number;
  commentnum: number;
  contents: string;
  picture1: string;
  picture2: string;
  picture3: string;
}

interface DBLike extends DBCUD {
  idx: number;
  useridx: number;
  postidx: number;
}

interface DBComment extends DBCUD {
  idx: number;
  postidx: number;
  useridx: number;
  comments: string;
}

interface DBAlarm extends DBCUD {
  idx: number;
  useridx: number;
  message: string;
}

interface DBGroupChat extends DBCUD {
  idx: number;
  groupidx: number;
  useridx: number;
  content: string;
}

interface DBProblem extends DBCUD {
  idx: number;
  groupidx: number;
  question: string;
  answer: boolean;
}

interface DBUserProblem extends DBCUD {
  idx: number;
  useridx: number;
  problemidx: number;
  correct: boolean;
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
  DBUserProblem
};

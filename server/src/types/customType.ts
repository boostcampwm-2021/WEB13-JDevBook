interface PostUpdateData {
  secret: number;
  contents: string;
  picture1: string | null;
  picture2: string | null;
  picture3: string | null;
}

interface PostAddData extends PostUpdateData {
  useridx: number;
  likenum: number;
}

interface CommentData {
  postidx: number;
  sender: string;
  comments: string;
}

interface IComment {
  writer: string;
  text: string;
}

interface IGroup {
  idx: number;
  title: string;
  description: string;
  cover: string;
}

interface IUserSocket {
  [key: string]: string;
}

interface IProfile {
  idx: number;
  nickname: string;
  cover: string | null;
  bio: string | null;
}

export {
  PostUpdateData,
  PostAddData,
  CommentData,
  IComment,
  IGroup,
  IUserSocket,
  IProfile
};

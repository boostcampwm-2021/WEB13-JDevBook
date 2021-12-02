export interface PostBody {
  contents: string;
  picture1: string | null;
  picture2: string | null;
  picture3: string | null;
}

export interface PostUpdateData extends PostBody {
  secret: boolean;
}

export interface PostAddData extends PostUpdateData {
  useridx: number;
  likenum: number;
  commentnum: number;
}

export interface PostData extends PostAddData {
  idx: number;
  createdAt: Date;
  BTUseruseridx: {
    bio: string | null;
    idx: number;
    nickname: string;
    profile: string | null;
  };
  likeFlag: boolean;
}

export interface PostHeaderProps {
  nickname: string;
  profile: string | null;
  createdAt: Date;
  secret: boolean;
}

export interface PostFooterProps {
  likenum: number;
  commentFlag: boolean;
  setCommentFlag: React.Dispatch<boolean>;
  postIdx: number;
  commentsNum: number;
  setCommentsNum: React.Dispatch<number>;
}

export interface PostImageInfo {
  url: string;
  originalWidth: number;
  originalHeight: number;
}

export interface PostImagesInfo {
  width: number;
  height: number;
  index: number;
  urls: string[];
}

export interface PostImageBoxProps {
  imageCount: number;
  images: PostImageInfo[] | null;
  isProfile: boolean;
}

export interface PostImageBoxStyle {
  width: number;
  height: number;
  leftBorder?: boolean;
  rightBorder?: boolean;
  topBorder?: boolean;
  bottomBorder?: boolean;
}

export interface PostRequestOptions {
  lastIdx: number;
  count: number;
  username: string;
}

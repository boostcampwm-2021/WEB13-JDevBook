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
}

export interface PostImageInfo {
  url: string;
  originalWidth: number;
  originalHeight: number;
}

export interface PostImageBoxProps {
  imageCount: number;
  images: PostImageInfo[] | null;
}

export interface PostImageBoxStyle {
  width: number;
  height: number;
  leftBorder?: boolean;
  rightBorder?: boolean;
  topBorder?: boolean;
  bottomBorder?: boolean;
}

export interface PostImageBoxStyleWithSource extends PostImageBoxStyle {
  index: number;
  urls: string[];
}

import { atom } from 'recoil';

import { PostData } from 'types/post';

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

export const isImgUploadingState = atom({
  key: 'isImgUploading',
  default: 0
});

export const uploadImgList = atom({
  key: 'uploadImgList',
  default: [] as string[]
});

import { useRecoilState, useResetRecoilState } from 'recoil';

import { modalStateStore } from 'recoil/common';
import { isImgUploadingState, postModalDataStates, uploadImgList } from 'recoil/post';

const useClosePostModal = () => {
  const resetModal = useResetRecoilState(modalStateStore);
  const resetImgList = useResetRecoilState(uploadImgList);
  const resetImgUploading = useResetRecoilState(isImgUploadingState);
  const [postData, setPostData] = useRecoilState(postModalDataStates);

  return () => {
    resetModal();
    resetImgList();
    resetImgUploading();
    setPostData({
      ...postData,
      idx: 0,
      secret: false,
      contents: '',
      likenum: 0,
      likeFlag: false,
      picture1: null,
      picture2: null,
      picture3: null,
      createdAt: new Date(),
      BTUseruseridx: { ...postData.BTUseruseridx }
    });
  };
};

export default useClosePostModal;

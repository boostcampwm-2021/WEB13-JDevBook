import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { modalStateStore } from 'recoil/common';
import { ModalHandler, ModalHandlerOptions } from 'types/common';

const useModalHandler = () => {
  const setModalState = useSetRecoilState(modalStateStore);
  const resetModal = useResetRecoilState(modalStateStore);

  return (type: ModalHandler, options?: ModalHandlerOptions) => {
    switch (type) {
      case ModalHandler.OPEN_POST_WRITER: {
        resetModal();
        setModalState((prev) => ({
          ...prev,
          post: { writer: true, inPhoto: false, isEnroll: options?.post?.isEnroll ?? true }
        }));
        break;
      }
      case ModalHandler.OPEN_IMAGE_UPLOADER: {
        setModalState((prev) => ({
          ...prev,
          post: { writer: true, inPhoto: true, isEnroll: options?.post?.isEnroll ?? true }
        }));
        break;
      }
      case ModalHandler.OPEN_USER_SEARCH: {
        setModalState((prev) => ({ ...prev, searchUser: true }));
        break;
      }
      case ModalHandler.TOGGLE_EDIT_PROFILE: {
        setModalState((prev) => ({ ...prev, editProfile: !prev.editProfile }));
        break;
      }
      case ModalHandler.TOGGLE_IMAGE_UPLOADER: {
        setModalState((prev) => ({ ...prev, post: { ...prev.post, inPhoto: !prev.post.inPhoto } }));
        break;
      }
      case ModalHandler.CLOSE_ALL: {
        resetModal();
        break;
      }
    }
  };
};

export default useModalHandler;

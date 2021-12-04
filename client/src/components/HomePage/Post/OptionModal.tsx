import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { postListStore, postModalDataStates } from 'recoil/post';

import fetchApi from 'api/fetch';
import { PostData } from 'types/post';
import useAlertModal from 'hooks/useAlertModal';
import useModalHandler from 'hooks/useModalHandler';
import { ModalHandler } from 'types/common';

const OptionModalContainer = styled.div`
  width: 240px;
  box-shadow: ${(props) => props.theme.shadow.optionModal};
  background: ${(props) => props.theme.white};
  border-radius: 8px;
  position: absolute;
  top: 48px;
  right: 16px;
  box-sizing: border-box;
  padding: 8px;
  z-index: 1;

  div {
    padding: 12px;
    transition: 0.2s ease-in;

    &:hover {
      cursor: pointer;
      background: ${(props) => props.theme.gray};
      border-radius: 8px;
    }
  }
`;

const FixDiv = styled.div`
  color: ${(props) => props.theme.black};
`;

const DeleteDiv = styled.div`
  color: ${(props) => props.theme.alert};
`;

const OptionModal = ({
  post,
  setModalOpen
}: {
  post: PostData;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleModal = useModalHandler();
  const [postList, setPostList] = useRecoilState(postListStore);
  const setPostData = useSetRecoilState(postModalDataStates);
  const alertMessage = useAlertModal();

  const modal = useRef<HTMLDivElement>(null);
  const closeModal = (e: any, force?: boolean) => {
    if (!force && modal.current?.contains(e.target)) {
      return;
    }
    setModalOpen(false);
  };

  const openPostModal = () => {
    setPostData(post);
    if (post.picture1) {
      handleModal(ModalHandler.OPEN_IMAGE_UPLOADER, { post: { isEnroll: false } });
    } else {
      handleModal(ModalHandler.OPEN_POST_WRITER, { post: { isEnroll: false } });
    }
  };

  const deletePost = async (postIdx: number) => {
    await fetchApi.deletePosts(postIdx);
    alertMessage(`게시글이 성공적으로 삭제되었습니다!`);
    setPostList(postList.filter((item) => item.idx !== postIdx));
  };

  useEffect(() => {
    document.addEventListener('click', closeModal);

    return () => {
      document.removeEventListener('click', closeModal);
    };
  }, []);

  return (
    <OptionModalContainer className="no-drag" ref={modal}>
      <FixDiv onClick={() => openPostModal()}>게시글 수정</FixDiv>
      <DeleteDiv onClick={() => deletePost(post.idx)}>게시글 삭제</DeleteDiv>
    </OptionModalContainer>
  );
};

export default OptionModal;

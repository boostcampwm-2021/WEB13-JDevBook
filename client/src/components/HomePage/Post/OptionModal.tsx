import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import { modalStateStore } from 'recoil/common';
import { postListStore, postModalDataStates } from 'recoil/post';

import fetchApi from 'api/fetch';
import { PostData } from 'types/post';
import useAlertModal from 'hooks/useAlertModal';

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

const OptionModal = ({ post }: { post: PostData }) => {
  const [modalState, setModalState] = useRecoilState(modalStateStore);
  const [postList, setPostList] = useRecoilState(postListStore);
  const setPostData = useSetRecoilState(postModalDataStates);
  const resetModalState = useResetRecoilState(modalStateStore);
  const alertMessage = useAlertModal();

  const modal = useRef<HTMLDivElement>(null);
  const closeModal = (e: any, force?: boolean) => {
    if (!force && modal.current?.contains(e.target)) {
      return;
    }
    resetModalState();
  };

  const openPostModal = () => {
    setPostData(post);
    if (post.picture1) {
      setModalState({
        ...modalState,
        post: {
          ...modalState.post,
          writer: true,
          index: -1,
          isEnroll: false,
          inPhoto: true
        }
      });
    } else {
      setModalState({
        ...modalState,
        post: { ...modalState.post, writer: true, index: -1, isEnroll: false }
      });
    }
  };

  const deletePost = async () => {
    const postIdx = modalState.post.index;
    resetModalState();
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
      <DeleteDiv onClick={() => deletePost()}>게시글 삭제</DeleteDiv>
    </OptionModalContainer>
  );
};

export default OptionModal;

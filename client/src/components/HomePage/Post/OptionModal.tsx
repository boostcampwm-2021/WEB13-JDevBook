import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useRecoilState, useResetRecoilState } from 'recoil';

import {
  modalStateStore,
  postListStore,
  postModalDataStates
} from 'recoil/store';
import palette from 'theme/palette';
import fetchApi from 'api/fetch';
import { PostData } from 'types/post';

const OptionModalContainer = styled.div`
  width: 240px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background: ${palette.white};
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
      background: ${palette.gray};
      border-radius: 8px;
    }
  }
`;

const OptionModal = ({ post }: { post: PostData }) => {
  const [modalState, setModalState] = useRecoilState(modalStateStore);
  const [postList, setPostList] = useRecoilState(postListStore);
  const [postData, setPostData] = useRecoilState(postModalDataStates);
  const resetModalState = useResetRecoilState(modalStateStore);

  const modal = React.useRef<HTMLDivElement>(null);
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
      <div onClick={() => openPostModal()}>게시글 수정</div>
      <div style={{ color: palette.alert }} onClick={() => deletePost()}>
        게시글 삭제
      </div>
    </OptionModalContainer>
  );
};

export default OptionModal;

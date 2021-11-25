import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  isImgUploadingState,
  modalStateStore,
  postListStore,
  postModalDataStates,
  uploadImgList,
  usersocketStates
} from 'recoil/store';
import fetchApi from 'api/fetch';
import { PostAddData, PostUpdateData, PostData } from 'types/post';

import ModalTitle from 'components/HomePage/PostWriterModal/ModalTitle';
import PostInfo from 'components/HomePage/PostWriterModal/PostInfo';
import ModalContents from 'components/HomePage/PostWriterModal/ModalContents';
import AddContentsBar from 'components/HomePage/PostWriterModal/AddContentsBar';
import ImgUploadModal from './ImgUploadModal';
import useClosePostModal from 'hooks/useClosePostModal';
import useAlertModal from 'hooks/useAlertModal';

const PostWriterModalOverlay = styled.div<{ modalState: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.2);

  display: ${(props) => (props.modalState ? 'flex' : 'none')};
  overscroll-behavior: none;
`;

const ModalAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const PostWriterModalInner = styled.div<{ modalState: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  box-sizing: border-box;
  padding: 20px;
  z-index: 6;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 8px;
  background-color: ${(props) => props.theme.white};
  animation: ${ModalAnimation} 0.2s 1;

  display: ${(props) => (props.modalState ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  overscroll-behavior: none;
`;

const Line = styled.div`
  width: 100%;
  border-color: ${(props) => props.theme.gray};
  border-width: 1px;
  border-style: solid;
  margin: 12px 0;
`;

const PostBtn = styled.div`
  width: 95%;
  height: 40px;
  margin-top: 16px;

  border-radius: 8px;
  background-color: ${(props) => props.theme.green};
  color: ${(props) => props.theme.white};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    filter: brightness(95%);
  }

  &:active {
    font-size: 15px;
    filter: brightness(90%);
  }
`;

const PostWriterModal = () => {
  const modalState = useRecoilValue(modalStateStore);
  const postData = useRecoilValue(postModalDataStates);
  const isImgUploading = useRecoilValue(isImgUploadingState);
  const [postList, setPostList] = useRecoilState(postListStore);
  const imgList = useRecoilValue(uploadImgList);
  const socket = useRecoilValue(usersocketStates);
  const closePostModal = useClosePostModal();
  const alertMessage = useAlertModal();

  /**
   * 등록 모달인지 수정 모달인지 알려주는 함수
   * @returns true이면 등록, false이면 수정
   */
  const isEnrollMode = () => modalState.post.isEnroll;
  const alertSuccess = () => {
    alertMessage(
      `게시글이 성공적으로 ${isEnrollMode() ? '게시' : '수정'}되었습니다!`
    );
  };
  const alertFail = () => {
    alertMessage(
      `게시글이 알수없는 이유로 ${
        isEnrollMode() ? '게시' : '수정'
      }되지 않았습니다.`,
      true
    );
  };

  const postDataToAPI = async () => {
    if (isImgUploading > 0)
      return alertMessage('이미지 업로드 중입니다. 잠시 후에 게시하세요', true);

    if (postData.contents === '') {
      return alertMessage('내용이 없습니다. 내용을 입력하세요.', true);
    }

    if (isImgUploading) {
      return alertMessage('이미지 업로드 중입니다. 잠시 후에 게시하세요', true);
    }

    const { useridx, contents, secret, likenum } = { ...postData };
    const picture1 = imgList[0] ?? null;
    const picture2 = imgList[1] ?? null;
    const picture3 = imgList[2] ?? null;

    const requestData = isEnrollMode()
      ? { useridx, contents, secret, picture1, picture2, picture3, likenum }
      : { secret, contents, picture1, picture2, picture3 };

    const { result, check } = isEnrollMode()
      ? await fetchApi.addPosts(requestData as PostAddData)
      : await fetchApi.updatePosts(postData.idx, requestData as PostUpdateData);

    // 통신 결과 후처리 (분리하면 좋을듯?)
    if (check) {
      const newPostIfExists: PostData = isEnrollMode() && {
        ...result,
        BTUseruseridx: { ...postData.BTUseruseridx }
      };

      const newPostList = isEnrollMode()
        ? [newPostIfExists, ...postList]
        : postList.map((post) =>
            post.idx === postData.idx
              ? ({ ...postData, picture1, picture2, picture3 } as PostData)
              : post
          );

      if (isEnrollMode() && !secret) {
        socket.emit('post_added');
      }
      alertSuccess();
      setPostList(newPostList);
      closePostModal();
    } else {
      alertFail();
    }
  };

  const modalClose = (e: React.MouseEvent) => {
    closePostModal();
  };

  return (
    <>
      <PostWriterModalOverlay
        modalState={modalState.post.writer}
        onClick={modalClose}
      />
      <PostWriterModalInner
        modalState={modalState.post.writer}
        className="no-drag"
      >
        <ModalTitle />
        <Line />
        <PostInfo />
        <ModalContents />
        <AddContentsBar />
        <PostBtn onClick={postDataToAPI}>
          <div>{isEnrollMode() ? '게시' : '수정'}</div>
        </PostBtn>
        <ImgUploadModal />
      </PostWriterModalInner>
    </>
  );
};

export default PostWriterModal;

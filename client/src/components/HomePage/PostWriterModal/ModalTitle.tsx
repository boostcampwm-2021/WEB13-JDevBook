import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { IoClose } from 'react-icons/io5';

import palette from 'theme/palette';
import { modalStateStore } from 'recoil/store';
import useClosePostModal from 'hooks/useClosePostModal';

const ModalTitleWrap = styled.div`
  width: 100%;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    font-size: 20px;
    font-weight: bold;
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  right: 12px;
  width: 36px;
  height: 36px;
  box-sizing: border-box;
  margin-right: 20px;
  border-radius: 50%;
  background-color: ${palette.lightgray};
  color: ${palette.darkgray};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    filter: brightness(95%);
  }

  &:active {
    width: 35px;
    height: 35px;
    filter: brightness(90%);
  }
`;
const ModalTitle = () => {
  const modalState = useRecoilValue(modalStateStore);
  const closeModal = useClosePostModal();

  return (
    <ModalTitleWrap>
      <div>
        {modalState.post.isEnroll ? '게시물 만들기' : '게시물 수정하기'}
      </div>
      <CloseBtn onClick={() => closeModal()}>
        <IoClose size="28px" />
      </CloseBtn>
    </ModalTitleWrap>
  );
};

export default ModalTitle;

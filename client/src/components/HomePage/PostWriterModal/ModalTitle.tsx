import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { IoClose } from 'react-icons/io5';

import palette from 'theme/palette';
import { modalVisibleStates, postWriterData } from 'recoil/store';

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
  }
`;

const ModalTitle = () => {
  const [modalState, setModalState] = useRecoilState(modalVisibleStates);
  const [postData, setPostData] = useRecoilState(postWriterData);

  const postWriterCancel = (e: React.MouseEvent<HTMLDivElement>) => {
    setModalState({ ...modalState, postWriter: false, postInPhoto: false });
    setPostData({
      ...postData,
      secret: false,
      contents: '',
      picture1: null,
      picture2: null,
      picture3: null
    });
  };

  return (
    <ModalTitleWrap>
      <div>게시물 만들기</div>
      <CloseBtn onClick={postWriterCancel}>
        <IoClose size="28px" />
      </CloseBtn>
    </ModalTitleWrap>
  );
};

export default ModalTitle;

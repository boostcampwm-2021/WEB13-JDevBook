import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { userDataStates, modalStateStore } from 'recoil/store';
import palette from 'theme/palette';
import { iconPhoto } from 'images/icons';

import { ProfilePhoto } from 'components/common';
import { PostWriterModal } from 'components/HomePage';

const PostWriterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  margin: 24px 0 0 0;

  padding: 4px 16px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;
  background-color: ${palette.white};
`;

const InputWrap = styled.div`
  display: flex;
  width: 100%;

  margin: 12px 0px;
`;

const ModalCallBtn = styled.div`
  width: 100%;
  margin: 0 0 0 10px;
  padding: 10px 15px;
  background-color: ${palette.lightgray};
  border-radius: 25px;

  color: ${palette.darkgray};

  &:hover {
    cursor: pointer;
    filter: brightness(95%);
  }

  &:active {
    filter: brightness(90%);
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${palette.gray};
`;

const ButtonsWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  margin: 10px 0;
`;

const StyledBtn = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 5px 15px;

  &:hover {
    cursor: pointer;
    background-color: ${palette.lightgray};
    transition: all 0.2s;
  }

  &:active {
    background-color: ${palette.gray};
  }

  img {
    height: 30px;
    width: 30px;
    margin-right: 10px;
  }

  div {
    font-weight: bold;
    color: ${palette.darkgray};
  }
`;

const PostWriter = () => {
  const [modalState, setModalState] = useRecoilState(modalStateStore);
  const userdata = useRecoilValue(userDataStates);

  const postWriterModalOn = (e: React.MouseEvent<HTMLDivElement>) => {
    setModalState({
      ...modalState,
      post: { ...modalState.post, writer: true }
    });
  };

  const withImgUploadModalOn = (e: React.MouseEvent<HTMLDivElement>) => {
    setModalState({
      ...modalState,
      post: { ...modalState.post, writer: true, inPhoto: true }
    });
  };

  return (
    <>
      <PostWriterBox className="no-drag">
        <InputWrap>
          <ProfilePhoto size="44px" userName={userdata.name} />
          <ModalCallBtn onClick={postWriterModalOn}>
            {userdata.name}님, 무슨 생각을 하고 계신가요?
          </ModalCallBtn>
        </InputWrap>
        <Line />
        <ButtonsWrap>
          <StyledBtn onClick={withImgUploadModalOn}>
            <img src={iconPhoto} alt="photo 아이콘" />
            <div>사진</div>
          </StyledBtn>
        </ButtonsWrap>
      </PostWriterBox>
      <PostWriterModal />
    </>
  );
};

export default PostWriter;

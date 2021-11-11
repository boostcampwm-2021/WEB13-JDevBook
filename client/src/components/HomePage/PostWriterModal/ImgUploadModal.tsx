import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { FiUpload } from 'react-icons/fi';
import { useRecoilState } from 'recoil';

import { modalVisibleStates } from 'recoil/store';
import palette from 'theme/palette';
import { ImgUploadModalProps } from 'utils/types';
import fetchApi from 'api/fetch';
// import objectStorage from 'api/objectStorage';

const ModalAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ImgUploadContainer = styled.div<ImgUploadModalProps>`
  position: fixed;
  top: 408px;
  width: 532px;
  height: 200px;
  box-sizing: border-box;
  padding: 8px;

  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  border-color: ${palette.darkgray};
  animation: ${ModalAnimation} 0.5s 1;

  display: ${(props) => (props.modalState ? 'block' : 'none')};
`;

const ImgUploadWrap = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 8px;
  background-color: ${palette.lightgray};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 36px;
  height: 36px;
  box-sizing: border-box;
  margin: 16px;

  border-radius: 50%;
  border-style: solid;
  border-width: 1px;
  border-color: ${palette.darkgray};
  background-color: ${palette.white};
  color: ${palette.darkgray};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const WhatWorkModal = styled.div`
  width: 150px;
  height: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div.icon {
    width: 40px;
    height: 40px;
    margin-bottom: 5px;

    border-radius: 50%;
    background-color: ${palette.gray};

    display: flex;
    justify-content: center;
    align-items: center;
  }
  div.title {
    font-size: 28px;
    font-weight: bold;
  }
  div.subtitle {
    font-size: 12px;
    font-weight: bold;
  }
`;

const ImgUploadModal = () => {
  const [modalState, setModalState] = useRecoilState(modalVisibleStates);
  const [img, setImg] = useState(null) as any;

  const imgUploadModalOff = (e: React.MouseEvent<HTMLDivElement>) => {
    setModalState({ ...modalState, postInPhoto: false });
  };
  const inputfile = useRef() as React.MutableRefObject<HTMLInputElement>;
  const imgUpload = (e: React.MouseEvent<HTMLDivElement>) => {
    inputfile.current.click();
  };
  const getFilename = async () => {
    if (inputfile.current.files) {
      // console.log(inputfile.current.value);
      // const imglist: FileList = inputfile.current.files;
      // // type에서 혹은 이름에서 확장자 찾기 가능.
      // await fetchApi.uploadImg(imglist);
      // await objectStorage.uploadObjectfile(
      //   '되나요.png',
      //   inputfile.current.files[0]
      // );
      // const fReader = new FileReader();
      // fReader.readAsDataURL(inputfile.current.files[0]);
      // fReader.onloadend = async (event) => {
      //   const imgurl: string | ArrayBuffer = event.target?.result ?? '';
      //   // arrayBuffer to string 구현, '' 제외
      //   if (typeof imgurl === 'string')
      // };
    }
  };

  return (
    <ImgUploadContainer
      modalState={modalState.postInPhoto}
      writerModalState={modalState.postWriter}
    >
      <ImgUploadWrap>
        <CloseBtn onClick={imgUploadModalOff}>
          <IoClose size="28px" />
        </CloseBtn>
        <WhatWorkModal onClick={imgUpload}>
          <div className="icon">
            <FiUpload size="20px" />
          </div>
          <div className="title">사진 추가</div>
          <div className="subtitle">또는 끌어서 놓습니다</div>
        </WhatWorkModal>
      </ImgUploadWrap>
      <input
        type="file"
        accept="image/*"
        ref={inputfile}
        onChange={getFilename}
        style={{ display: 'none' }}
      />
    </ImgUploadContainer>
  );
};

export default ImgUploadModal;

import React, { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { FiUpload } from 'react-icons/fi';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { imageViewerState as ivState, uploadImgList } from 'recoil/store';

import {
  isImgUploadingState,
  modalStateStore,
  postModalDataStates
} from 'recoil/store';
import palette from 'theme/palette';
import fetchApi from 'api/fetch';
import useAlertModal from 'hooks/useAlertModal';

const ModalAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ImgUploadContainer = styled.div<{ modalState: boolean }>`
  position: fixed;
  top: 360px;
  width: 532px;
  height: 200px;
  box-sizing: border-box;
  padding: 8px;

  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  border-color: ${palette.darkgray};
  animation: ${ModalAnimation} 0.2s 1;

  display: ${(props) => (props.modalState ? 'block' : 'none')};
`;

const ImgUploadWrap = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 8px;
  background-color: ${palette.lightgray};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${palette.gray};
  }

  &:hover {
    cursor: pointer;
    /* background-color: ${palette.darkgray};
    filter: brightness(95%);
    transition: all 0.1s; */
  }

  &:active {
    //filter: brightness(90%);
  }
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
    filter: brightness(95%);
    transition: all 0.1s;
  }

  &:active {
    width: 35px;
    height: 35px;
    background-color: ${palette.gray};
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

const ImgPreview = styled.div`
  /* width: 300px;
  height: 200px; */

  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  div.imgset {
    display: flex;
    flex-direction: row;
  }

  img {
    width: 120px;
    height: 100%;
    max-height: 180px;
    padding: 10px;

    &:hover {
      cursor: pointer;
      filter: brightness(80%);
      transition: all 0.1s;
    }
    &:active {
      cursor: pointer;
    }
  }

  img[src=''] {
    display: none;
  }
`;

const CloseOneImg = styled.div<{ imgsrc: string | undefined }>`
  display: ${({ imgsrc }) => (imgsrc ? 'flex' : 'none')};
  position: relative;
  top: 10px;
  left: 30px;
  z-index: 3;

  &:hover {
    cursor: pointer;
    color: red;
  }
  &:active {
    cursor: pointer;
    transform-origin: 10px 10px;
    transform: scale(1.2);
    transition: transform 0.1s;
  }
`;

const ImgUploadModal = () => {
  const [modalState, setModalState] = useRecoilState(modalStateStore);
  const [postData, setPostData] = useRecoilState(postModalDataStates);
  const [isImgUploading, setIsImgUploading] =
    useRecoilState(isImgUploadingState);
  const [imageViewerState, setImageViewerState] = useRecoilState(ivState);
  const [imgList, setImgList] = useRecoilState(uploadImgList);
  const alertMessage = useAlertModal();

  const inputfile = useRef() as React.MutableRefObject<HTMLInputElement>;
  const imgUploadWrapRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const imgPreviewModal = useRef() as React.MutableRefObject<HTMLInputElement>;
  const uploadButtonRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const workModalRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  let dropfile: FileList[] = [];

  const imgUploadModalOff = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setModalState({
      ...modalState,
      post: { ...modalState.post, inPhoto: false }
    });
  };

  const openFileModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imgList.length >= 3)
      return alertMessage('첨부 사진은 3장까지 가능합니다.', palette.alert);

    inputfile.current.click();
  };

  const uploadOneFile = (filelist: FileList | null, uploadNum: number) => {
    if (imgList.length >= 3) {
      return alertMessage('첨부 사진은 3장까지 가능합니다.', palette.alert);
    }
    setIsImgUploading(uploadNum + 1);
    getFile(filelist, uploadNum + 1);
  };

  const getFile = async (filelist: FileList | null, uploadNum: number) => {
    if (!filelist || filelist.length === 0) {
      setIsImgUploading(uploadNum - 1);
      return alertMessage('파일을 가져오지 못했습니다.', palette.alert);
    }

    if (filelist[0].type.match(/image\/*/) === null) {
      setIsImgUploading(uploadNum - 1);
      return alertMessage('이미지 파일이 아닙니다.', palette.alert);
    }

    const imglist: FileList = filelist; //inputfile.current.files;
    const s3fileRes = await fetchApi.uploadImg(imglist);

    if (!s3fileRes.save) {
      alertMessage('이미지 업로드 실패');
      return setIsImgUploading(uploadNum - 1);
    }

    setImgList([...imgList, s3fileRes.file.location]);
  };

  const imgPreviewBigger = (e: BaseSyntheticEvent) => {
    e.stopPropagation(); // 업로드 창 막기
    setImageViewerState({
      // 연속되게는 안함
      ...imageViewerState,
      imageCount: 1,
      currentIdx: 0,
      images: [e.target.src ?? ''],
      isOpen: true
    });
  };

  const deleteOneImg = (e: any, idx: number) => {
    e.stopPropagation();
    const tmp = imgList.map((v) => v);
    tmp.splice(idx, 1);
    setImgList(tmp);
  };

  const imgsetRendering = (): JSX.Element[] => {
    return [0, 1, 2].map((v) => (
      <div key={v} className="imgset">
        <CloseOneImg imgsrc={imgList[v]} onClick={(e) => deleteOneImg(e, v)}>
          <IoClose size="20px" />
        </CloseOneImg>
        <img
          className="no-drag"
          src={imgList[v] ?? ''}
          onClick={imgPreviewBigger}
        />
      </div>
    ));
  };

  useEffect(() => {
    if (isImgUploading > 0) {
      setIsImgUploading(isImgUploading - 1);
    }
    if (imgList.length > 0) {
      imgPreviewModal.current.style.display = 'flex';
      workModalRef.current.style.display = 'none';
    } else {
      imgPreviewModal.current.style.display = 'none';
      workModalRef.current.style.display = 'flex';
    }
  }, [imgList]);

  useEffect(() => {
    // 게시글 수정 시에 필요
    // 1,2,3 순서대로 채워지지만 코드가 그걸 알리가 없지...
    if (postData.picture3 !== null) {
      setImgList([
        postData.picture1 ?? '',
        postData.picture2 ?? '',
        postData.picture3
      ]);
    } else if (postData.picture2 !== null) {
      setImgList([postData.picture1 ?? '', postData.picture2]);
    } else if (postData.picture1 !== null) {
      setImgList([postData.picture1]);
    }
  }, [postData]);

  const dragDropEvent = (e: React.DragEvent, color: string) => {
    e.preventDefault();
    imgUploadWrapRef.current.style.backgroundColor = color;
  };

  return (
    <ImgUploadContainer modalState={modalState.post.inPhoto}>
      <ImgUploadWrap
        ref={imgUploadWrapRef}
        onClick={openFileModal}
        onDragEnter={(e) => {
          dragDropEvent(e, palette.darkgray);
        }}
        onDragOver={(e) => {
          dragDropEvent(e, palette.darkgray);
        }}
        onDragLeave={(e) => {
          dragDropEvent(e, palette.lightgray);
        }}
        onDrop={(e) => {
          dragDropEvent(e, palette.lightgray);
          uploadOneFile(e.dataTransfer.files, isImgUploading);
        }}
      >
        <CloseBtn onClick={imgUploadModalOff}>
          <IoClose size="28px" />
        </CloseBtn>
        <WhatWorkModal ref={workModalRef}>
          <div className="icon">
            <FiUpload size="20px" />
          </div>
          <div className="title">사진 추가</div>
          <div className="subtitle">또는 끌어서 놓습니다</div>
          <input
            type="file"
            accept="image/*"
            ref={inputfile}
            onChange={() => {
              uploadOneFile(inputfile.current.files, isImgUploading);
            }}
            style={{ display: 'none' }}
          />
        </WhatWorkModal>
        <ImgPreview ref={imgPreviewModal}>{imgsetRendering()}</ImgPreview>
      </ImgUploadWrap>
    </ImgUploadContainer>
  );
};

export default ImgUploadModal;

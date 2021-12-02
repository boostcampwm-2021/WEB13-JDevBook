import React, { BaseSyntheticEvent, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { IoClose } from 'react-icons/io5';
import { FiUpload } from 'react-icons/fi';

import { modalStateStore } from 'recoil/common';
import { imageViewerState as ivState, uploadImgList } from 'recoil/post';
import { isImgUploadingState, postModalDataStates } from 'recoil/post';

import fetchApi from 'api/fetch';
import style from 'theme/style';
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
  top: 260px;
  width: 532px;
  height: 200px;
  box-sizing: border-box;
  padding: 8px;

  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  border-color: ${(props) => props.theme.darkgray};
  animation: ${ModalAnimation} 0.2s 1;

  display: ${(props) => (props.modalState ? 'block' : 'none')};
`;

const ImgUploadWrap = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 8px;
  background-color: ${(props) => props.theme.lightgray};

  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.gray};
  }

  &:hover {
    cursor: pointer;
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
  border-color: ${(props) => props.theme.darkgray};
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.darkgray};

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
    background-color: ${(props) => props.theme.gray};
  }
`;

const WhatWorkModal = styled.div`
  width: 150px;
  height: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.black};

  div.icon {
    width: 40px;
    height: 40px;
    margin-bottom: 5px;

    border-radius: 50%;
    background-color: ${(props) => props.theme.gray};

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
  display: none;
  align-items: center;

  div.imgset {
    display: flex;
  }

  img {
    position: relative;
    width: 146px;
    height: 146px;
    right: 14px;
    object-fit: contain;
    margin-right: 8px;
    box-sizing: border-box;
    padding: ${style.padding.smallest};

    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;
    background-color: ${(props) => props.theme.white};
    border-radius: 8px;

    &:hover {
      cursor: pointer;
      background-color: ${(props) => props.theme.lightgray};
      transition: all 0.1s;
    }
    &:active {
      cursor: pointer;
      background-color: ${(props) => props.theme.gray};
    }
  }

  img[src=''] {
    display: none;
  }
`;

const CloseOneImg = styled.div<{ imgsrc: string | undefined }>`
  display: ${({ imgsrc }) => (imgsrc ? 'flex' : 'none')};
  position: absolute;
  margin: 6px 0 0 106px;
  z-index: 3;
  color: ${(props) => props.theme.black};

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.alert};
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
  const [isImgUploading, setIsImgUploading] = useRecoilState(isImgUploadingState);
  const [imageViewerState, setImageViewerState] = useRecoilState(ivState);
  const [imgList, setImgList] = useRecoilState(uploadImgList);
  const alertMessage = useAlertModal();

  const inputfile = useRef() as React.MutableRefObject<HTMLInputElement>;
  const imgUploadWrapRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const imgPreviewModal = useRef() as React.MutableRefObject<HTMLInputElement>;
  const workModalRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const imgUploadModalOff = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setModalState({
      ...modalState,
      post: { ...modalState.post, inPhoto: false }
    });
  };

  const openFileModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imgList.length >= 3) return alertMessage('첨부 사진은 3장까지 가능합니다.', true);
    if (isImgUploading > 0) return alertMessage('이미지 업로드 중입니다.', true);

    inputfile.current.click();
  };

  const uploadOneFile = (filelist: FileList | null) => {
    if (imgList.length >= 3) return alertMessage('첨부 사진은 3장까지 가능합니다.', true);
    if (isImgUploading > 0) return alertMessage('이미지 업로드 중입니다.', true);

    const uploadNum = isImgUploading;
    setIsImgUploading(uploadNum + 1);
    getFile(filelist, uploadNum + 1);
  };

  const getFile = async (filelist: FileList | null, uploadNum: number) => {
    if (!filelist || filelist.length === 0) {
      alertMessage('파일을 가져오지 못했습니다.', true);
      return setIsImgUploading(uploadNum - 1);
    }

    if (filelist[0].type.match(/image\/*/) === null) {
      alertMessage('이미지 파일이 아닙니다.', true);
      return setIsImgUploading(uploadNum - 1);
    }

    if (filelist[0].size > 1024 * 1024) {
      alertMessage('1MB 이하만 가능합니다.', true);
      return setIsImgUploading(uploadNum - 1);
    }

    const imglist: FileList = filelist; //inputfile.current.files;
    const s3fileRes = await fetchApi.uploadImg(imglist);

    if (!s3fileRes.save) {
      if (s3fileRes.file) alertMessage('이미지 업로드 실패', true);
      else alertMessage('1MB 이하만 가능합니다.', true);
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
        <img className="no-drag" src={imgList[v] ?? ''} onClick={imgPreviewBigger} />
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
      setImgList([postData.picture1 ?? '', postData.picture2 ?? '', postData.picture3]);
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
          dragDropEvent(e, '#8a8c91');
        }}
        onDragOver={(e) => {
          dragDropEvent(e, '#8a8c91');
        }}
        onDragLeave={(e) => {
          dragDropEvent(e, '#e4e6eb');
        }}
        onDrop={(e) => {
          dragDropEvent(e, '#e4e6eb');
          uploadOneFile(e.dataTransfer.files);
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
              uploadOneFile(inputfile.current.files);
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

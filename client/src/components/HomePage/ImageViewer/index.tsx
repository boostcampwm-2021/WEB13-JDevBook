import React, { useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { MdClose, MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { imageViewerState as ivState } from 'recoil/store';

import palette from 'theme/palette';

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: black;
  z-index: 1;
`;

const ButtonWrap = styled.div`
  position: absolute;
  width: 100%;
  text-align: right;
  cursor: pointer;

  svg {
    margin: 32px;
    color: white;
    font-size: 32px;
  }
`;

const Body = styled.div`
  width: calc(100% - 96px);
  height: 100vh;
  flex: 1;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 48px;
`;

const OriginalImage = styled.img`
  max-width: calc(100% - 192px);
  max-height: 100vh;
  display: block;
  box-sizing: border-box;
`;

const AnimationIcon = styled.div<{ isLeft?: boolean; hidden: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${palette.darkgray};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in-out;

  ${({ hidden }) =>
    hidden &&
    css`
      visibility: hidden;
    `}

  &:hover {
    background-color: ${palette.lightgray};
    transform: ${({ isLeft }) =>
      isLeft ? css`translateX(-8px)` : css`translateX(8px)`};
  }

  svg {
    font-size: 24px;
  }
`;

const ImageViewer = () => {
  const [imageViewerState, setImageViewerState] = useRecoilState(ivState);
  const { isOpen, imageCount, currentIdx, images } = imageViewerState;

  useEffect(() => {
    const [x, y] = [window.scrollX, window.scrollY];
    window.onscroll = () => {
      window.scrollTo(x, y);
    };
    return () => {
      window.onscroll = null;
    };
  }, []);

  const isFirst = useCallback(() => {
    return currentIdx === 0;
  }, [currentIdx]);

  const isLast = useCallback(() => {
    return currentIdx === imageCount - 1;
  }, [currentIdx, imageCount]);

  const goPrevious = useCallback(() => {
    setImageViewerState((prev) => ({
      ...prev,
      currentIdx: prev.currentIdx !== 0 ? prev.currentIdx - 1 : 0
    }));
  }, [setImageViewerState]);

  const goNext = useCallback(() => {
    setImageViewerState((prev) => ({
      ...prev,
      currentIdx:
        prev.currentIdx !== prev.imageCount - 1
          ? prev.currentIdx + 1
          : prev.imageCount - 1
    }));
  }, [setImageViewerState]);

  return (
    <Container>
      <ButtonWrap
        onClick={() => {
          setImageViewerState({ ...imageViewerState, isOpen: false });
        }}
      >
        <MdClose />
      </ButtonWrap>
      <Body>
        <AnimationIcon isLeft hidden={isFirst()} onClick={goPrevious}>
          <MdArrowBackIosNew />
        </AnimationIcon>
        <OriginalImage src={images[currentIdx]} />
        <AnimationIcon hidden={isLast()} onClick={goNext}>
          <MdArrowForwardIos />
        </AnimationIcon>
      </Body>
    </Container>
  );
};

export default ImageViewer;
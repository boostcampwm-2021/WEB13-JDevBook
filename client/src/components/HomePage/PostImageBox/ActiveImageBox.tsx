import React from 'react';
import styled, { css } from 'styled-components';
import { useRecoilState } from 'recoil';

import { PostImagesInfo } from 'types/post';
import { imageViewerState as ivState } from 'recoil/store';

const HoverBox = styled.div`
  position: relative;
  cursor: pointer;

  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0;
  }

  &:active div {
    opacity: 0.25;
  }
`;

const ImageBox = styled.img<{ width: number; height: number }>`
  display: block;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  box-sizing: border-box;
`;

const ActiveImageBox = (props: PostImagesInfo) => {
  const [imageViewerState, setImageViewerState] = useRecoilState(ivState);
  const { index, width, height, urls } = props;
  return (
    <HoverBox
      onClick={() => {
        setImageViewerState({
          ...imageViewerState,
          imageCount: urls.length,
          currentIdx: index,
          images: urls,
          isOpen: true
        });
      }}
    >
      <ImageBox
        className="no-drag"
        src={urls[index]}
        width={width}
        height={height}
      />
      <div />
    </HoverBox>
  );
};

export default ActiveImageBox;

import React from 'react';
import styled, { css } from 'styled-components';
import { useRecoilState } from 'recoil';

import { PostImageBoxStyle, PostImageBoxStyleWithSource } from 'types/post';
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

const ImageBox = styled.img<PostImageBoxStyle>`
  display: block;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  box-sizing: border-box;

  ${({ leftBorder, rightBorder, topBorder, bottomBorder }) => css`
    border-left: ${leftBorder && `1px solid white`};
    border-right: ${rightBorder && `1px solid white`};
    border-top: ${topBorder && `1px solid white`};
    border-bottom: ${bottomBorder && `1px solid white`};
  `}
`;

const ActiveImageBox = (props: PostImageBoxStyleWithSource) => {
  const [imageViewerState, setImageViewerState] = useRecoilState(ivState);
  const {
    index,
    width,
    height,
    leftBorder,
    rightBorder,
    topBorder,
    bottomBorder,
    urls
  } = props;
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
        leftBorder={leftBorder}
        rightBorder={rightBorder}
        topBorder={topBorder}
        bottomBorder={bottomBorder}
      />
      <div />
    </HoverBox>
  );
};

export default ActiveImageBox;

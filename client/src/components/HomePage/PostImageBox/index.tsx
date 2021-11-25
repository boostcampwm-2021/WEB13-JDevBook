import React, { useCallback } from 'react';
import styled from 'styled-components';

import { PostImageBoxProps, PostImageInfo } from 'types/post';

import OneImage from './OneImage';
import TwoImages from './TwoImages';
import { ThreeImagesHorizontal, ThreeImagesVertical } from './ThreeImages';

const SkeletonBox = styled.div<{ isProfile: boolean }>`
  width: ${({ isProfile }) => (isProfile ? '532px' : '680px')};
  height: ${({ isProfile }) => (isProfile ? '532px' : '680px')};
  background: ${(props) => props.theme.lightgray};
`;

const PostImageBox = ({ imageCount, images, isProfile }: PostImageBoxProps) => {
  const isLoading = useCallback(() => {
    return images === null;
  }, [images]);

  if (isLoading()) {
    return <SkeletonBox isProfile={isProfile} />;
  }

  const postImages = images as PostImageInfo[];
  const { originalWidth, originalHeight } = postImages[0];

  return imageCount === 1 ? (
    <OneImage postImages={postImages} isProfile={isProfile} />
  ) : imageCount === 2 ? (
    <TwoImages postImages={postImages} isProfile={isProfile} />
  ) : imageCount === 3 && originalWidth >= originalHeight ? (
    <ThreeImagesHorizontal postImages={postImages} isProfile={isProfile} />
  ) : imageCount === 3 && originalWidth < originalHeight ? (
    <ThreeImagesVertical postImages={postImages} isProfile={isProfile} />
  ) : (
    <div></div>
  );
};

export default PostImageBox;

import React, { useCallback } from 'react';
import styled from 'styled-components';

import palette from 'theme/palette';
import { PostImageBoxProps, PostImageInfo } from 'types/post';

import OneImage from './OneImage';
import TwoImages from './TwoImages';
import { ThreeImagesHorizontal, ThreeImagesVertical } from './ThreeImages';

const SkeletonBox = styled.div`
  width: 680px;
  height: 680px;
  background: ${palette.lightgray};
`;

const PostImageBox = ({ imageCount, images }: PostImageBoxProps) => {
  const isLoading = useCallback(() => {
    return images === null;
  }, [images]);

  if (isLoading()) {
    return <SkeletonBox />;
  }

  const postImages = images as PostImageInfo[];
  const { originalWidth, originalHeight } = postImages[0];

  return imageCount === 1 ? (
    <OneImage postImages={postImages} />
  ) : imageCount === 2 ? (
    <TwoImages postImages={postImages} />
  ) : imageCount === 3 && originalWidth >= originalHeight ? (
    <ThreeImagesHorizontal postImages={postImages} />
  ) : imageCount === 3 && originalWidth < originalHeight ? (
    <ThreeImagesVertical postImages={postImages} />
  ) : (
    <div></div>
  );
};

export default PostImageBox;

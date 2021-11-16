import React from 'react';

import { PostImageInfo } from 'types/post';
import imageUtil from 'utils/imageUtil';

import ActiveImageBox from './ActiveImageBox';

const OneImage = ({ postImages }: { postImages: PostImageInfo[] }) => {
  if (postImages.length !== 1) return <div></div>;

  const { url, originalWidth, originalHeight } = postImages[0];
  const [width, height] = imageUtil.getImageFitSize(
    680,
    originalWidth,
    originalHeight
  );

  return (
    <ActiveImageBox index={0} width={width} height={height} urls={[url]} />
  );
};

export default OneImage;

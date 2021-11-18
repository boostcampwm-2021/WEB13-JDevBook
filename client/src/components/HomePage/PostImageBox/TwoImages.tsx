import React from 'react';
import imageUtil from 'utils/imageUtil';

import { PostImageInfo } from 'types/post';
import ActiveImageBox from './ActiveImageBox';
import { CropCenter, FlexWrap } from './styles';

const TwoImages = ({ postImages }: { postImages: PostImageInfo[] }) => {
  if (postImages.length !== 2) return <div></div>;

  const boxLength = 340;

  const { url: url1, originalWidth: ow1, originalHeight: oh1 } = postImages[0];
  const { url: url2, originalWidth: ow2, originalHeight: oh2 } = postImages[1];

  const [w1, h1] = imageUtil.getImageFitSizeForCrop(
    boxLength,
    boxLength,
    ow1,
    oh1
  );
  const [w2, h2] = imageUtil.getImageFitSizeForCrop(
    boxLength,
    boxLength,
    ow2,
    oh2
  );

  const urls = [url1, url2];

  return (
    <FlexWrap>
      <CropCenter width={boxLength} height={boxLength}>
        <ActiveImageBox
          index={0}
          width={w1}
          height={h1}
          urls={urls}
          rightBorder
        />
      </CropCenter>
      <CropCenter width={boxLength} height={boxLength}>
        <ActiveImageBox
          index={1}
          width={w2}
          height={h2}
          urls={urls}
          leftBorder
        />
      </CropCenter>
    </FlexWrap>
  );
};

export default TwoImages;

import imageUtil from 'utils/imageUtil';

import { PostImageInfo } from 'types/post';
import ActiveImageBox from 'components/HomePage/PostImageBox/ActiveImageBox';
import { CropCenter, FlexWrap } from 'components/HomePage/PostImageBox/styles';

const TwoImages = ({ postImages, isProfile }: { postImages: PostImageInfo[]; isProfile: boolean }) => {
  if (postImages.length !== 2) return <div></div>;

  const boxLength = isProfile ? 266 : 340;

  const { url: url1, originalWidth: ow1, originalHeight: oh1 } = postImages[0];
  const { url: url2, originalWidth: ow2, originalHeight: oh2 } = postImages[1];

  const [w1, h1] = imageUtil.getImageFitSizeForCrop(boxLength, boxLength, ow1, oh1);
  const [w2, h2] = imageUtil.getImageFitSizeForCrop(boxLength, boxLength, ow2, oh2);

  const urls = [url1, url2];

  return (
    <FlexWrap>
      <CropCenter width={boxLength} height={boxLength} rightBorder>
        <ActiveImageBox index={0} width={w1} height={h1} urls={urls} />
      </CropCenter>
      <CropCenter width={boxLength} height={boxLength} leftBorder>
        <ActiveImageBox index={1} width={w2} height={h2} urls={urls} />
      </CropCenter>
    </FlexWrap>
  );
};

export default TwoImages;

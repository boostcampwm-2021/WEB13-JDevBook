import { PostImageInfo } from 'types/post';
import imageUtil from 'utils/imageUtil';

import { CropCenter, FlexWrap } from 'components/HomePage/PostImageBox/styles';
import ActiveImageBox from 'components/HomePage/PostImageBox/ActiveImageBox';

const ThreeImagesHorizontal = ({
  postImages,
  isProfile
}: {
  postImages: PostImageInfo[];
  isProfile: boolean;
}) => {
  if (postImages.length !== 3) return <div></div>;

  const boxLengthHalf = isProfile ? 266 : 340;
  const boxLengthFull = isProfile ? 532 : 680;

  const { url: url1, originalWidth: ow1, originalHeight: oh1 } = postImages[0];
  const { url: url2, originalWidth: ow2, originalHeight: oh2 } = postImages[1];
  const { url: url3, originalWidth: ow3, originalHeight: oh3 } = postImages[2];

  const [w1, h1] = imageUtil.getImageFitSizeForCrop(
    boxLengthFull,
    boxLengthHalf,
    ow1,
    oh1
  );
  const [w2, h2] = imageUtil.getImageFitSizeForCrop(
    boxLengthHalf,
    boxLengthHalf,
    ow2,
    oh2
  );
  const [w3, h3] = imageUtil.getImageFitSizeForCrop(
    boxLengthHalf,
    boxLengthHalf,
    ow3,
    oh3
  );

  const urls = [url1, url2, url3];

  return (
    <div>
      <CropCenter width={boxLengthFull} height={boxLengthHalf} bottomBorder>
        <ActiveImageBox index={0} width={w1} height={h1} urls={urls} />
      </CropCenter>
      <FlexWrap>
        <CropCenter
          width={boxLengthHalf}
          height={boxLengthHalf}
          topBorder
          rightBorder
        >
          <ActiveImageBox index={1} width={w2} height={h2} urls={urls} />
        </CropCenter>
        <CropCenter
          width={boxLengthHalf}
          height={boxLengthHalf}
          topBorder
          leftBorder
        >
          <ActiveImageBox index={2} width={w3} height={h3} urls={urls} />
        </CropCenter>
      </FlexWrap>
    </div>
  );
};

const ThreeImagesVertical = ({
  postImages,
  isProfile
}: {
  postImages: PostImageInfo[];
  isProfile: boolean;
}) => {
  if (postImages.length !== 3) return <div></div>;

  const boxLengthHalf = isProfile ? 266 : 340;
  const boxLengthFull = isProfile ? 532 : 680;

  const { url: url1, originalWidth: ow1, originalHeight: oh1 } = postImages[0];
  const { url: url2, originalWidth: ow2, originalHeight: oh2 } = postImages[1];
  const { url: url3, originalWidth: ow3, originalHeight: oh3 } = postImages[2];

  const [w1, h1] = imageUtil.getImageFitSizeForCrop(
    boxLengthHalf,
    boxLengthFull,
    ow1,
    oh1
  );
  const [w2, h2] = imageUtil.getImageFitSizeForCrop(
    boxLengthHalf,
    boxLengthHalf,
    ow2,
    oh2
  );
  const [w3, h3] = imageUtil.getImageFitSizeForCrop(
    boxLengthHalf,
    boxLengthHalf,
    ow3,
    oh3
  );

  const urls = [url1, url2, url3];

  return (
    <FlexWrap>
      <CropCenter width={boxLengthHalf} height={boxLengthFull} rightBorder>
        <ActiveImageBox index={0} width={w1} height={h1} urls={urls} />
      </CropCenter>
      <div>
        <CropCenter
          width={boxLengthHalf}
          height={boxLengthHalf}
          leftBorder
          bottomBorder
        >
          <ActiveImageBox index={1} width={w2} height={h2} urls={urls} />
        </CropCenter>
        <CropCenter
          width={boxLengthHalf}
          height={boxLengthHalf}
          leftBorder
          topBorder
        >
          <ActiveImageBox index={2} width={w3} height={h3} urls={urls} />
        </CropCenter>
      </div>
    </FlexWrap>
  );
};

export { ThreeImagesHorizontal, ThreeImagesVertical };

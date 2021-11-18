import { PostImageInfo } from 'types/post';
import imageUtil from 'utils/imageUtil';

import { CropCenter, FlexWrap } from './styles';
import ActiveImageBox from './ActiveImageBox';

const ThreeImagesHorizontal = ({
  postImages
}: {
  postImages: PostImageInfo[];
}) => {
  if (postImages.length !== 3) return <div></div>;

  const boxLengthHalf = 340;
  const boxLengthFull = 680;

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
      <CropCenter width={boxLengthFull} height={boxLengthHalf}>
        <ActiveImageBox
          index={0}
          width={w1}
          height={h1}
          urls={urls}
          bottomBorder
        />
      </CropCenter>
      <FlexWrap>
        <CropCenter width={boxLengthHalf} height={boxLengthHalf}>
          <ActiveImageBox
            index={1}
            width={w2}
            height={h2}
            urls={urls}
            topBorder
            rightBorder
          />
        </CropCenter>
        <CropCenter width={boxLengthHalf} height={boxLengthHalf}>
          <ActiveImageBox
            index={2}
            width={w3}
            height={h3}
            urls={urls}
            topBorder
            leftBorder
          />
        </CropCenter>
      </FlexWrap>
    </div>
  );
};

const ThreeImagesVertical = ({
  postImages
}: {
  postImages: PostImageInfo[];
}) => {
  if (postImages.length !== 3) return <div></div>;

  const boxLengthHalf = 340;
  const boxLengthFull = 680;

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
      <CropCenter width={boxLengthHalf} height={boxLengthFull}>
        <ActiveImageBox
          index={0}
          width={w1}
          height={h1}
          urls={urls}
          rightBorder
        />
      </CropCenter>
      <div>
        <CropCenter width={boxLengthHalf} height={boxLengthHalf}>
          <ActiveImageBox
            index={1}
            width={w2}
            height={h2}
            urls={urls}
            leftBorder
            bottomBorder
          />
        </CropCenter>
        <CropCenter width={boxLengthHalf} height={boxLengthHalf}>
          <ActiveImageBox
            index={2}
            width={w3}
            height={h3}
            urls={urls}
            leftBorder
            topBorder
          />
        </CropCenter>
      </div>
    </FlexWrap>
  );
};

export { ThreeImagesHorizontal, ThreeImagesVertical };

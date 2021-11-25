import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { PostBody, PostImageBoxProps, PostImageInfo } from 'types/post';
import PostImageBox from 'components/HomePage/PostImageBox';
import imageUtil from 'utils/imageUtil';

const BodyContainer = styled.div`
  width: 100%;
  box-sizing: inherit;

  p {
    padding-left: 16px;
    padding-right: 16px;
    color: ${(props) => props.theme.black};
  }
`;

const ImagesWrap = styled.div<{ isProfile: boolean }>`
  width: ${({ isProfile }) => (isProfile ? `532px` : `680px`)};
  background: ${(props) => props.theme.white};
  position: relative;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 여기서 이미지 정보들을 전부 가공해서 주자 (url, 원본 width, 원본 height)
const Body = ({
  postBody,
  isProfile
}: {
  postBody: PostBody;
  isProfile: boolean;
}) => {
  const { contents, picture1, picture2, picture3 } = postBody;
  const initMeta = {
    imageCount: [picture1, picture2, picture3].filter((item) => item !== null)
      .length,
    images: null,
    isProfile
  };
  const [imagesMeta, setImagesMeta] = useState<PostImageBoxProps>(initMeta);

  useEffect(() => {
    async function makeImageInfoObject() {
      if (initMeta.imageCount !== 0) {
        const images = await Promise.all(
          [picture1, picture2, picture3]
            .filter((item) => item !== null)
            .map(async (item) => {
              if (item) {
                const [url, originalWidth, originalHeight] =
                  await imageUtil.getImageSize(item);
                return { url, originalWidth, originalHeight };
              }
            })
        );
        setImagesMeta({
          ...initMeta,
          images: images.filter(
            (image) => image !== undefined
          ) as PostImageInfo[]
        });
      }
    }
    if (picture1) {
      makeImageInfoObject();
    }
  }, [picture1, picture2, picture3]);

  return (
    <BodyContainer>
      <p>{contents}</p>
      {picture1 && (
        <ImagesWrap isProfile={isProfile}>
          <PostImageBox
            imageCount={imagesMeta.imageCount}
            images={imagesMeta.images}
            isProfile={isProfile}
          />
        </ImagesWrap>
      )}
    </BodyContainer>
  );
};

export default Body;

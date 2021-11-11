import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import palette from 'theme/palette';

import { PostBody, PostImageBoxProps, PostImageInfo } from 'utils/types';
import PostImageBox from 'components/HomePage/PostImageBox';
import imageUtil from 'utils/imageUtil';

const BodyContainer = styled.div`
  width: 100%;
  box-sizing: inherit;

  p {
    padding-left: 16px;
    padding-right: 16px;
    color: #050505;
  }
`;

const ImagesWrap = styled.div`
  width: 680px;
  background: ${palette.white};
  position: relative;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 여기서 이미지 정보들을 전부 가공해서 주자 (url, 원본 width, 원본 height)
const Body = ({ contents, picture1, picture2, picture3 }: PostBody) => {
  const initMeta = {
    imageCount: [picture1, picture2, picture3].filter((item) => item !== null)
      .length,
    images: null
  };
  const [imagesMeta, setImagesMeta] = useState<PostImageBoxProps>(initMeta);

  useEffect(() => {
    async function makeImageInfoObject() {
      if (imagesMeta.imageCount !== 0) {
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
          ...imagesMeta,
          images: images.filter(
            (image) => image !== undefined
          ) as PostImageInfo[]
        });
      }
    }

    makeImageInfoObject();
  }, []);

  return (
    <BodyContainer>
      <p>{contents}</p>
      {picture1 && (
        <ImagesWrap>
          <PostImageBox
            imageCount={imagesMeta.imageCount}
            images={imagesMeta.images}
          />
        </ImagesWrap>
      )}
    </BodyContainer>
  );
};

export default Body;

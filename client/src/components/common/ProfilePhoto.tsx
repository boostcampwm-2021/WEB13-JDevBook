import React from 'react';
import styled from 'styled-components';

import { ProfilePhotoProps } from 'utils/types';
import palette from 'theme/palette';
import { defaultProfile } from 'images';

const StyledProfilePhoto = styled.img<ProfilePhotoProps>`
  width: ${(props) => props.size || '65px'};
  height: ${(props) => props.size || '65px'};
  border-radius: 50%;
`;

const ProfilePhoto = ({ src, size }: ProfilePhotoProps) => {
  return (
    <StyledProfilePhoto
      src={src || defaultProfile}
      size={size}
      alt="프로필 사진"
    ></StyledProfilePhoto>
  );
};

export default ProfilePhoto;

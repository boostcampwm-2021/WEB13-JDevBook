import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ProfilePhotoProps } from 'types/common';
import { defaultProfile } from 'images';
import useResetProfile from 'hooks/useResetProfile';

const ClickableProfilePhotoWrap = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    filter: brightness(90%);
  }

  &:active {
    filter: brightness(80%);
  }
`;

const StyledProfilePhoto = styled.img<{ size?: string }>`
  width: ${(props) => props.size || '70px'};
  height: ${(props) => props.size || '70px'};
  border-radius: 50%;
`;

const ProfilePhoto = ({ userName, size }: ProfilePhotoProps) => {
  const profileImgURL = useMemo(() => `https://github.com/${userName}.png`, [userName]);
  return (
    <StyledProfilePhoto
      src={userName !== '' ? profileImgURL : defaultProfile}
      size={size}
      alt="프로필 사진"
      className="no-drag"
    />
  );
};

const ClickableProfilePhoto = ({ userName, size }: ProfilePhotoProps) => {
  const profileURL = `/profile/${userName}`;
  const resetProfile = useResetProfile();

  const photoClickHandler = (e: React.MouseEvent) => {
    resetProfile(userName);
  };

  return (
    <ClickableProfilePhotoWrap to={profileURL} onClick={photoClickHandler}>
      <ProfilePhoto userName={userName} size={size} />
    </ClickableProfilePhotoWrap>
  );
};
export { ProfilePhoto, ClickableProfilePhoto };

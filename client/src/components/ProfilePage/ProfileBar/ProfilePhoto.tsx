import React from 'react';
import styled from 'styled-components';

import palette from 'theme/palette';

const ProfilePhotoWrap = styled.div`
  position: relative;
  top: -130px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-sizing: border-box;
  margin-left: 12px;
  padding: 4px;

  background-color: ${palette.white};

  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledProfilePhoto = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const ProfilePhoto = ({ userName }: { userName: string }) => {
  const profileImgURL = `https://github.com/${userName}.png`;

  return (
    <ProfilePhotoWrap>
      {userName !== '' ? (
        <StyledProfilePhoto
          src={profileImgURL}
          alt="프로필 사진"
          className="no-drag"
        />
      ) : (
        ''
      )}
    </ProfilePhotoWrap>
  );
};

export default ProfilePhoto;

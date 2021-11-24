import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import palette from 'theme/palette';

import ProfileInfo from 'components/ProfilePage/ProfileBar/ProfileInfo';
import ProfilePhoto from 'components/ProfilePage/ProfileBar/ProfilePhoto';
import ProfileEdit from 'components/ProfilePage/ProfileBar/ProfileEdit';
import ProfileEditModal from 'components/ProfilePage/ProfileEditModal';
import { useRecoilValue } from 'recoil';
import { profileState, userDataStates } from 'recoil/store';

const ProfileBarContainer = styled.div`
  width: 100%;
  min-width: 720px;
  max-width: 908px;
  height: 204px;
  box-sizing: border-box;
  padding: 28px;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  background-color: ${palette.white};

  display: flex;
`;

const ProfileBar = () => {
  const profileData = useRecoilValue(profileState);

  return (
    <ProfileBarContainer>
      <ProfilePhoto userName={profileData.nickname} />
      <ProfileInfo />
      <ProfileEdit />
      <ProfileEditModal />
    </ProfileBarContainer>
  );
};

export default ProfileBar;

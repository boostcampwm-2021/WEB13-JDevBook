import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { modalStateStore } from 'recoil/common';
import { userDataStates, profileState } from 'recoil/user';

import style from 'theme/style';

const ProfileEditWrap = styled.div<{ myProfile: boolean }>`
  display: ${(props) => (props.myProfile ? 'flex' : 'none')};
  align-items: flex-end;
`;

const ProfileEditBtn = styled.div`
  width: 120px;
  height: 20px;
  margin-right: 20px;
  padding: 8px ${style.padding.normal};

  border-radius: 8px;
  background-color: ${(props) => props.theme.green};
  color: ${(props) => props.theme.inColorBox};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    filter: brightness(95%);
  }

  &:active {
    filter: brightness(90%);
    font-size: 15px;
  }
`;

const ProfileEdit = () => {
  const [modalState, setModalState] = useRecoilState(modalStateStore);
  const userData = useRecoilValue(userDataStates);
  const profileData = useRecoilValue(profileState);
  const [myProfile, setMyProfile] = useState<boolean>(false);

  const toggleModalHandler = (e: React.MouseEvent) => {
    setModalState({ ...modalState, editProfile: !modalState.editProfile });
  };

  useEffect(() => {
    if (userData.name === profileData.nickname) setMyProfile(true);
    else setMyProfile(false);
  }, [profileData, userData]);

  return (
    <ProfileEditWrap myProfile={myProfile} className="no-drag">
      <ProfileEditBtn onClick={toggleModalHandler}>프로필 편집</ProfileEditBtn>
    </ProfileEditWrap>
  );
};

export default ProfileEdit;

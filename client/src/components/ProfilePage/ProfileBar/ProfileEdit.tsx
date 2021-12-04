import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { userDataStates, profileState } from 'recoil/user';
import style from 'theme/style';
import useModalHandler from 'hooks/useModalHandler';
import { ModalHandler } from 'types/common';

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
  const userData = useRecoilValue(userDataStates);
  const profileData = useRecoilValue(profileState);
  const [myProfile, setMyProfile] = useState<boolean>(false);
  const handleModal = useModalHandler();

  const toggleModalHandler = (e: React.MouseEvent) => {
    handleModal(ModalHandler.TOGGLE_EDIT_PROFILE);
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

import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { profileState } from 'recoil/store';
import palette from 'theme/palette';
import style from 'theme/style';

const ProfileInfoWrap = styled.div`
  flex: 1;

  background-color: ${palette.white};

  display: flex;
  flex-direction: column;
`;

const ProfileTitle = styled.div`
  margin-bottom: ${style.margin.normal};
  font-size: ${style.font.title};
`;

const ProfileBio = styled.div`
  box-sizing: border-box;
  padding-right: ${style.padding.large};
  color: ${palette.black};
`;

const ProfileInfo = () => {
  const profileData = useRecoilValue(profileState);

  return (
    <ProfileInfoWrap>
      <ProfileTitle>{profileData.nickname}</ProfileTitle>
      <ProfileBio className="no-drag">
        {profileData.bio || '자기소개를 입력해서 자신을 표현해보세요!'}
      </ProfileBio>
    </ProfileInfoWrap>
  );
};

export default ProfileInfo;

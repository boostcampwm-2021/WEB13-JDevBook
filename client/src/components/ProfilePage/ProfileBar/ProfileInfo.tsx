import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { modalStateStore, profileState } from 'recoil/store';
import style from 'theme/style';

import { ProfileEditModal } from 'components/ProfilePage';

const ProfileInfoWrap = styled.div`
  flex: 1;

  background-color: ${(props) => props.theme.white};

  display: flex;
  flex-direction: column;
`;

const ProfileTitle = styled.div`
  font-size: ${style.font.title};
  color: ${(props) => props.theme.black};
`;

const ProfileBio = styled.div`
  box-sizing: border-box;
  margin-top: ${style.margin.normal};
  padding-right: ${style.padding.large};
  color: ${(props) => props.theme.black};
`;

const ProfileInfo = () => {
  const profileData = useRecoilValue(profileState);
  const modalState = useRecoilValue(modalStateStore);

  return (
    <ProfileInfoWrap>
      <ProfileTitle>{profileData.nickname}</ProfileTitle>
      {modalState.editProfile ? (
        <ProfileEditModal />
      ) : (
        <ProfileBio className="no-drag">
          {profileData.bio || '자기소개를 입력해서 자신을 표현해보세요!'}
        </ProfileBio>
      )}
    </ProfileInfoWrap>
  );
};

export default ProfileInfo;

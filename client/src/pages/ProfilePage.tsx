import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import styled, { createGlobalStyle } from 'styled-components';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { imageViewerState, profileState, userDataStates } from 'recoil/store';
import palette from 'theme/palette';

import {
  Gnb,
  SideBar,
  InfoSideBar,
  GroupSideBar,
  InitUserData,
  InitSocket,
  LoadingModal
} from 'components/common';
import { PostWriter, ImageViewer } from 'components/HomePage';
import {
  ProfileBar,
  ProfileCover,
  InitProfileData,
  PostList,
  ProfileInfoBar
} from 'components/ProfilePage';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${palette.lightgray};
  }
`;

const ProfilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageLayout = styled.div`
  display: flex;
`;

const ContentsContainer = styled.div<{ contentsState: boolean }>`
  width: calc(100vw - 680px);
  min-width: 720px;
  margin: 0 12px;

  display: ${(props) => (props.contentsState ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 1040px) {
    width: 100%;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  min-width: 720px;
  max-width: 908px;
  flex: 1;

  display: flex;
`;

const InfoContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-right: 12px;
`;

const PostContainer = styled.div`
  width: 544px;
  box-sizing: border-box;
  padding-left: 12px;
`;

const ProfilePage: React.FC<RouteComponentProps<{ username: string }>> = ({
  match
}) => {
  const userData = useRecoilValue(userDataStates);
  const profileData = useRecoilValue(profileState);
  const resetProfileData = useResetRecoilState(profileState);
  const imageViewer = useRecoilValue(imageViewerState);
  const [myProfile, setMyProfile] = useState<boolean>(false);

  useEffect(() => {
    if (userData.name === profileData.nickname) setMyProfile(true);
    else setMyProfile(false);
  }, [profileData, userData]);

  useEffect(() => {
    return () => {
      resetProfileData();
    };
  }, []);

  return (
    <ProfilePageContainer>
      <GlobalStyle />
      <InitUserData />
      <InitProfileData userName={match.params.username} />
      <InitSocket />
      <LoadingModal
        modalState={profileData.idx === 0 || userData.name === ''}
      />
      <Gnb />
      <PageLayout>
        <SideBar isLeft={true}>
          <InfoSideBar />
          <GroupSideBar />
        </SideBar>
        <ContentsContainer contentsState={true}>
          <ProfileCover />
          <ProfileBar />
          <InnerContainer>
            <InfoContainer>
              <ProfileInfoBar />
            </InfoContainer>
            <PostContainer>
              {myProfile ? <PostWriter /> : ''}
              <PostList username={match.params.username} />
            </PostContainer>
          </InnerContainer>
        </ContentsContainer>
      </PageLayout>
      {imageViewer.isOpen && <ImageViewer />}
    </ProfilePageContainer>
  );
};

export default ProfilePage;

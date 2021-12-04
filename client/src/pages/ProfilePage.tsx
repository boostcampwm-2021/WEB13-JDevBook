import React, { Suspense, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import styled, { createGlobalStyle, css } from 'styled-components';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { currentPageStates } from 'recoil/common';
import { userDataStates, profileState } from 'recoil/user';
import { imageViewerState } from 'recoil/post';
import useModalHandler from 'hooks/useModalHandler';
import { ModalHandler, Page } from 'types/common';

import { InitUserData, LoadingModal, FakeSideBar, FakeGnb, FakeProfileBar } from 'components/common';
import { PostWriter, ImageViewer } from 'components/HomePage';
import { ProfileBar, ProfileCover, InitProfileData, PostList, ProfileInfoBar } from 'components/ProfilePage';

const GlobalStyle = createGlobalStyle`
  ${({}) => {
    return css`
      body {
        background-color: ${(props) => props.theme.lightgray};
      }
    `;
  }}
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

const ProfilePage: React.FC<RouteComponentProps<{ username: string }>> = ({ match }) => {
  const userData = useRecoilValue(userDataStates);
  const profileData = useRecoilValue(profileState);
  const resetProfileData = useResetRecoilState(profileState);
  const imageViewer = useRecoilValue(imageViewerState);
  const [myProfile, setMyProfile] = useState<boolean>(false);
  const setCurrentPage = useSetRecoilState(currentPageStates);
  const handleModal = useModalHandler();

  useEffect(() => {
    if (userData.name === profileData.nickname) setMyProfile(true);
    else setMyProfile(false);
  }, [profileData, userData]);

  useEffect(() => {
    setCurrentPage(Page.PROFILE);
    return () => {
      handleModal(ModalHandler.CLOSE_ALL);
      resetProfileData();
    };
  }, []);

  return (
    <ProfilePageContainer>
      <GlobalStyle />
      <InitUserData />
      <InitProfileData userName={match.params.username} />
      <LoadingModal modalState={profileData.idx === 0 || userData.name === ''} />
      <FakeGnb />
      <PageLayout>
        <FakeSideBar />
        <ContentsContainer contentsState={profileData.idx !== 0}>
          <ProfileCover />
          <ProfileBar />
          <InnerContainer>
            <InfoContainer>
              <Suspense fallback={<FakeProfileBar />}>
                <ProfileInfoBar />
              </Suspense>
            </InfoContainer>
            <PostContainer>
              {myProfile ? <PostWriter /> : ''}
              <PostList />
            </PostContainer>
          </InnerContainer>
        </ContentsContainer>
      </PageLayout>
      {imageViewer.isOpen && <ImageViewer />}
    </ProfilePageContainer>
  );
};

export default ProfilePage;

import { useEffect } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { useRecoilState } from 'recoil';

import { imageViewerState as ivState } from 'recoil/store';

import { PostWriter, PostList, ImageViewer } from 'components/HomePage';
import {
  Gnb,
  SideBar,
  InfoSideBar,
  GroupSideBar,
  InitUserData,
  InitSocket
} from 'components/common';

const BodyColor = createGlobalStyle`
  ${({}) => {
    return css`
      body {
        background-color: ${(props) => props.theme.lightgray};
      }
    `;
  }}
`;

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageLayout = styled.div`
  display: flex;
`;

const PostContainer = styled.div`
  width: calc(100vw - 680px);
  min-width: 720px;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 1040px) {
    width: 100%;
  }
`;

const InnerContainer = styled.div`
  width: 680px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomePage = () => {
  const [imageViewerState, setImageViewerState] = useRecoilState(ivState);

  useEffect(() => {
    return () => {
      window.scrollTo({ top: 0 });
    };
  }, []);

  return (
    <HomePageContainer>
      <BodyColor />
      <InitUserData />
      <InitSocket />
      <Gnb type="home" rightModalType="" />
      <PageLayout>
        <SideBar isLeft={true}>
          <InfoSideBar />
          <GroupSideBar />
        </SideBar>
        <PostContainer>
          <InnerContainer>
            <PostWriter />
            <PostList />
          </InnerContainer>
        </PostContainer>
      </PageLayout>
      {imageViewerState.isOpen && <ImageViewer />}
    </HomePageContainer>
  );
};

export default HomePage;

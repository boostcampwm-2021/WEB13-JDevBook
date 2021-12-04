import { useEffect } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { currentPageStates } from 'recoil/common';
import { imageViewerState as ivState } from 'recoil/post';
import { ModalHandler, Page } from 'types/common';
import useModalHandler from 'hooks/useModalHandler';

import { PostWriter, PostList, ImageViewer } from 'components/HomePage';
import { FakeSideBar, InitUserData, FakeGnb } from 'components/common';

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
  const imageViewerState = useRecoilValue(ivState);
  const setCurrentPage = useSetRecoilState(currentPageStates);
  const handleModal = useModalHandler();

  useEffect(() => {
    setCurrentPage(Page.HOME);

    return () => {
      handleModal(ModalHandler.CLOSE_ALL);
      window.scrollTo({ top: 0 });
    };
  }, []);

  return (
    <HomePageContainer>
      <BodyColor />
      <InitUserData />
      <FakeGnb />
      <PageLayout>
        <FakeSideBar />
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

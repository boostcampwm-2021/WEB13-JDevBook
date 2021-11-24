import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import palette from 'theme/palette';

import {
  Gnb,
  SideBar,
  InfoSideBar,
  GroupSideBar,
  InitUserData,
  InitSocket
} from 'components/common';
import { GroupSelectTitle, GroupSelectList } from 'components/GroupSelectPage';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${palette.lightgray};
  }
`;

const GroupSelectPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentsContainer = styled.div`
  width: 100%;
  min-width: 720px;
  margin: 0 12px;
  box-sizing: border-box;
  padding: 30px 50px;

  display: flex;
  flex-direction: column;
`;

const GroupSelectPage = () => {
  return (
    <GroupSelectPageContainer>
      <GlobalStyle />
      <InitUserData />
      <InitSocket />
      <Gnb type="group" />
      <PageLayout>
        <SideBar isLeft={true}>
          <InfoSideBar />
          <GroupSideBar />
        </SideBar>
        <ContentsContainer>
          <GroupSelectTitle />
          <GroupSelectList />
        </ContentsContainer>
      </PageLayout>
    </GroupSelectPageContainer>
  );
};

export default GroupSelectPage;

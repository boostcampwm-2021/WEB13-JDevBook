import React from 'react';
import styled from 'styled-components';

import {
  Gnb,
  SideBar,
  InfoSideBar,
  ChatSideBar,
  GroupSideBar,
  InitUserData
} from '../components/common';

const GroupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ContentsWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GroupPage = () => {
  return (
    <GroupPageContainer>
      <InitUserData />
      <Gnb type="group" />
      <ContentsWrap>
        <SideBar isLeft={true}>
          <InfoSideBar />
          <GroupSideBar />
        </SideBar>
        <SideBar isLeft={false}>
          <ChatSideBar />
        </SideBar>
      </ContentsWrap>
    </GroupPageContainer>
  );
};

export default GroupPage;

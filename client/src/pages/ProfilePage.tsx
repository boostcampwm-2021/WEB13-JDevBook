import React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import {
  Gnb,
  SideBar,
  InfoSideBar,
  ChatSideBar,
  GroupSideBar
} from '../components';

const ProfilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ContentsWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface MatchParams {
  userID: string;
}

const ProfilePage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  return (
    <ProfilePageContainer>
      <Gnb />
      <ContentsWrap>
        <SideBar isLeft={true}>
          <InfoSideBar />
          <GroupSideBar />
        </SideBar>
        <SideBar isLeft={false}>
          <ChatSideBar />
        </SideBar>
      </ContentsWrap>
    </ProfilePageContainer>
  );
};

export default ProfilePage;

import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import styled, { createGlobalStyle, css } from 'styled-components';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { groupState } from 'recoil/store';
import { defaultGroup } from 'images/groupimg';
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
import {
  ProblemList,
  GroupNavBar,
  InitGroupData,
  About,
  GroupChat
} from 'components/GroupPage';

const GlobalStyle = createGlobalStyle`
  ${({}) => {
    return css`
      body {
        background-color: ${(props) => props.theme.lightgray};
      }
    `;
  }}
`;

const GroupPageContainer = styled.div`
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

  img {
    width: 100%;
    min-width: 720px;
    max-width: 908px;
    height: 320px;
    object-fit: cover;
  }
`;

const GroupPage: React.FC<RouteComponentProps<{ groupidx: string }>> = ({
  match
}) => {
  const groupData = useRecoilValue(groupState);
  const resetGroupData = useResetRecoilState(groupState);

  useEffect(() => {
    return () => resetGroupData();
  }, []);

  return (
    <GroupPageContainer>
      <GlobalStyle />
      <InitUserData />
      <InitGroupData groupIdx={Number(match.params.groupidx)} />
      <InitSocket />
      <LoadingModal modalState={groupData.idx === 0} />
      <Gnb type="group" />
      <PageLayout>
        <SideBar isLeft={true}>
          <InfoSideBar />
          <GroupSideBar />
        </SideBar>
        <ContentsContainer contentsState={groupData.idx !== 0}>
          <img src={groupData.cover || defaultGroup} alt="그룹 이미지" />
          <GroupNavBar />
          <About />
          <ProblemList groupIdx={Number(match.params.groupidx)} />
        </ContentsContainer>
        <GroupChat groupIdx={Number(match.params.groupidx)} />
      </PageLayout>
    </GroupPageContainer>
  );
};

export default GroupPage;

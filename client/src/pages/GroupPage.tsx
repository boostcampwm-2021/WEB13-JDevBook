import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import styled, { createGlobalStyle, css } from 'styled-components';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { currentPageStates } from 'recoil/common';
import { groupState } from 'recoil/group';
import useModalHandler from 'hooks/useModalHandler';
import { ModalHandler, Page } from 'types/common';
import { defaultGroup } from 'images/groupimg';

import { InitUserData, LoadingModal, FakeSideBar, FakeGnb } from 'components/common';
import { ProblemList, GroupNavBar, InitGroupData, About, GroupChat } from 'components/GroupPage';

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

const GroupPage: React.FC<RouteComponentProps<{ groupidx: string }>> = ({ match }) => {
  const groupData = useRecoilValue(groupState);
  const resetGroupData = useResetRecoilState(groupState);
  const setCurrentPage = useSetRecoilState(currentPageStates);
  const handleModal = useModalHandler();

  useEffect(() => {
    setCurrentPage(Page.GROUP);
    return () => {
      handleModal(ModalHandler.CLOSE_ALL);
      resetGroupData();
    };
  }, []);

  return (
    <GroupPageContainer>
      <GlobalStyle />
      <InitUserData />
      <InitGroupData groupIdx={Number(match.params.groupidx)} />
      <LoadingModal modalState={groupData.idx === 0} />
      <FakeGnb />
      <PageLayout>
        <FakeSideBar />
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

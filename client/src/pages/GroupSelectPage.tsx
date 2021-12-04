import { useEffect } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { useSetRecoilState } from 'recoil';

import { currentPageStates } from 'recoil/common';
import useModalHandler from 'hooks/useModalHandler';
import { ModalHandler, Page } from 'types/common';

import { FakeSideBar, InitUserData, FakeGnb } from 'components/common';
import { GroupSelectTitle, GroupSelectList } from 'components/GroupSelectPage';

const GlobalStyle = createGlobalStyle`
  ${({}) => {
    return css`
      body {
        background-color: ${(props) => props.theme.lightgray};
      }
    `;
  }}
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
  width: calc(100vw - 340px);
  min-width: 720px;
  box-sizing: border-box;
  padding: 30px 50px;

  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1040px) {
    width: 100%;
  }
`;

const GroupSelectPage = () => {
  const setCurrentPage = useSetRecoilState(currentPageStates);
  const handleModal = useModalHandler();

  useEffect(() => {
    setCurrentPage(Page.GROUP_SELECT);
    return () => handleModal(ModalHandler.CLOSE_ALL);
  }, []);

  return (
    <GroupSelectPageContainer>
      <GlobalStyle />
      <InitUserData />
      <FakeGnb />
      <PageLayout>
        <FakeSideBar />
        <ContentsContainer>
          <GroupSelectTitle />
          <GroupSelectList />
        </ContentsContainer>
      </PageLayout>
    </GroupSelectPageContainer>
  );
};

export default GroupSelectPage;

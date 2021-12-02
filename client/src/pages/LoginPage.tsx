import styled from 'styled-components';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { currentPageStates } from 'recoil/common';

import { Page } from 'types/common';

import Greeter from 'components/LoginPage/Greeter';
import LoginBox from 'components/LoginPage/LoginBox';
import Footer from 'components/LoginPage/Footer';

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  min-height: 440px;
  @media screen and (max-width: 880px) {
    min-height: 640px;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  width: 100vw;
  height: 100%;

  @media screen and (max-width: 880px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

function LoginPage() {
  const setCurrentPage = useSetRecoilState(currentPageStates);

  useEffect(() => {
    setCurrentPage(Page.LOGIN);
  }, []);

  return (
    <LoginPageContainer>
      <Content>
        <Greeter />
        <LoginBox />
      </Content>
      <Footer />
    </LoginPageContainer>
  );
}

export default LoginPage;

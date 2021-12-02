import styled from 'styled-components';

import { GithubLoginButton } from 'react-social-login-buttons';

import mainLogo from 'images/main-logo.png';
import fetchApi from 'api/fetch';

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 400px;
  height: 400px;
  background-color: #fafafa;
  border-radius: 50px;

  margin-right: 10vw;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  @media screen and (max-width: 880px) {
    margin-top: 50px;
    margin-right: 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const MainLogo = styled.img`
  width: 80px;

  &:nth-child(1) {
    margin-bottom: 20px;
  }
`;

const Text = styled.div`
  margin-bottom: 50px;
  white-space: nowrap;
`;

const LoginBox = () => {
  return (
    <Box className="no-drag" data-cy="LoginBox">
      <Content>
        <MainLogo src={mainLogo} />
        <Text>개발자라면 Github 아이디는 가지고 계시죠?</Text>
        <GithubLoginButton onClick={async () => (window.location.href = await fetchApi.getLoginlink())} />
      </Content>
    </Box>
  );
};

export default LoginBox;

import React from 'react';
import styled from 'styled-components';
import mainLogo from '../../images/main-logo.png';
import { GithubLoginButton } from 'react-social-login-buttons';

const LoginBox = () => {
  const loginGithub = () => {
    fetch('/oauth/login')
      .then((res) => res.json())
      .then((loginLink) => {
        window.location.href = loginLink;
      });
  };
  return (
    <Box>
      <Wrapper>
        <MainLogoElement />
        <Text>개발자라면 Github 아이디는 가지고 계시죠?</Text>
        <GithubLoginButton onClick={loginGithub} />
      </Wrapper>
    </Box>
  );
};

const MainLogoElement = styled.img.attrs({
  src: `${mainLogo}`
})`
  margin-top: 50px;
  &:nth-child(1) {
    margin-bottom: 10px;
  }
`;

const Text = styled.div`
  margin-bottom: 50px;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 35vw;
  background-color: #fff;
  height: 50%;
  border-radius: 50px;
  margin-right: 5vw;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const Wrapper = styled.div``;

export default LoginBox;

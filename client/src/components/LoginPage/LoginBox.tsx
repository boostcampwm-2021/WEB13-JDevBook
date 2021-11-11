import React from 'react';
import styled from 'styled-components';

import { GithubLoginButton } from 'react-social-login-buttons';

import mainLogo from '../../images/main-logo.png';
import fetchApi from 'api/fetch';
import palette from 'theme/palette';
import { useHistory } from 'react-router-dom';

const Box = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;

  width: 35vw;
  height: 50%;
  background-color: ${palette.white};
  border-radius: 50px;
  
  margin-right: 5vw;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

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

const LoginBox = (): JSX.Element => {
  //const history = useHistory();
  return (
    <Box>
      <div>
        <MainLogoElement />
        <Text>개발자라면 Github 아이디는 가지고 계시죠?</Text>
        <GithubLoginButton
          onClick={
            async () => (window.location.href = await fetchApi.getLoginlink())
            // https://github.~~로 가는거라 history가 안되는거 같은데 의견부탁
          }
        />
      </div>
    </Box>
  );
};

export default LoginBox;

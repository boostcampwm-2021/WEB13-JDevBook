import styled from 'styled-components';

import { GithubLoginButton } from 'react-social-login-buttons';

import mainLogo from '../../images/main-logo.png';
import fetchApi from 'api/fetch';

const Box = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;

  width: 35vw;
  height: 50%;
  background-color: #fafafa;
  border-radius: 50px;

  margin-right: 5vw;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const MainLogo = styled.img`
  width: 80px;
  margin-top: 50px;

  &:nth-child(1) {
    margin-bottom: 10px;
  }
`;

const Text = styled.div`
  margin-bottom: 50px;
`;

const LoginBox = (): JSX.Element => {
  return (
    <Box className="no-drag">
      <div>
        <MainLogo src={mainLogo} />
        <Text>개발자라면 Github 아이디는 가지고 계시죠?</Text>
        <GithubLoginButton
          onClick={async () =>
            (window.location.href = await fetchApi.getLoginlink())
          }
        />
      </div>
    </Box>
  );
};

export default LoginBox;

import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled, { keyframes } from 'styled-components';

import { isLoginfailStates } from 'recoil/common';
import { mainLogo } from 'images';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.lightgray};
`;

const loadingAnimation = keyframes`
  0% {
    padding-bottom: 0px
  }
  50% {
    padding-bottom: 10px
  }
  100% {
    padding-bottom: 0px
  }
`;

const LoadingLogo = styled.img`
  width: 100px;
  height: 100px;

  animation: ${loadingAnimation} 0.5s ease infinite;
`;

const LoadingTitle = styled.div`
  font-size: 50px;
  color: ${(props) => props.theme.green};
`;

const IsLoginPage = () => {
  const loginfail = useRecoilValue(isLoginfailStates);
  const history = useHistory();

  useEffect(() => {
    if (loginfail === true) {
      history.replace('/');
    }
  }, [loginfail]);

  return (
    <>
      <Content>
        <LoadingLogo src={mainLogo} alt="메인 로고" />
        <LoadingTitle>JDevBook</LoadingTitle>
      </Content>
    </>
  );
};

export default IsLoginPage;

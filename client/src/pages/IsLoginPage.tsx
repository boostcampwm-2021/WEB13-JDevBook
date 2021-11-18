import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { keyframes } from 'styled-components';

import { isLoginfailStates } from 'recoil/store';
import { mainLogo } from 'images';
import palette from 'theme/palette';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
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
  color: ${palette.green};
`;

const IsLoginPage = () => {
  const loginfail = useRecoilValue(isLoginfailStates);
  const [message, setMessage] = useState('로그인 여부 확인중 ...');
  const history = useHistory();

  useEffect(() => {
    if (loginfail === true) {
      alert('비정상적인 접근입니다.');
      history.push('/');
      //setMessage('로그인이 되어있지 않습니다.');
      //setLink(<button onClick={() => history.push('/')}>돌아가기</button>);
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

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoginfail } from 'recoil/store';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const IsLoginPage = () => {
  const loginfail = useRecoilValue(isLoginfail);
  const [message, setMessage] = useState('로그인 여부 확인중 ...');
  const [link, setLink] = useState(<></>);
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
        <div>{message}</div>
        {link}
      </Content>
    </>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export default IsLoginPage;

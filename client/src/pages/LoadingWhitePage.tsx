import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Content = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const LoadingWhitePage = ({ login }: { login: boolean }) => {
  const history = useHistory();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (check === true && login === true) {
      history.push('/home');
    }
    setCheck(true);
  }, [login]);

  return (
    <>
      <Content></Content>
    </>
  );
};

export default LoadingWhitePage;

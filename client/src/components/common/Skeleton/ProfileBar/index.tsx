import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 24px;
  box-sizing: border-box;
  padding: 16px;

  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;
  background-color: ${(props) => props.theme.white};

  div {
    border-radius: 12px;
    background: ${(props) => props.theme.skeleton};

    &:last-child {
      margin-top: 12px;
    }
  }
`;

const FakeProfileBar = () => {
  return (
    <Container className="no-drag">
      <div style={{ width: 120, height: 24 }}></div>
      <div style={{ width: '100%', height: 25 }}></div>
    </Container>
  );
};

export default FakeProfileBar;

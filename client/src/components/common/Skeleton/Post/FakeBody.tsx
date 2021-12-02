import styled from 'styled-components';

const FakeBodyContainer = styled.div`
  width: 100%;
  padding: 0px 16px;
  box-sizing: border-box;

  div {
    border-radius: 12px;
    background: ${(props) => props.theme.skeleton};

    &:last-child {
      margin-top: 2px;
    }
  }
`;

const FakeImageBox = styled.div`
  width: 100%;
  height: 320px;
  background: ${(props) => props.theme.skeleton};
  margin-top: 16px;
`;

const FakeBody = () => {
  return (
    <>
      <FakeBodyContainer>
        <div style={{ width: 300, height: 18 }}></div>
        <div style={{ width: 480, height: 18 }}></div>
      </FakeBodyContainer>
      <FakeImageBox />
    </>
  );
};

export default FakeBody;

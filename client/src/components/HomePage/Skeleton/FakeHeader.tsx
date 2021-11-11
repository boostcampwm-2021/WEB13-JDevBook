import React from 'react';
import styled, { css } from 'styled-components';
import palette from 'theme/palette';

const FakeHeaderContainer = styled.div`
  width: 100%;
  box-sizing: inherit;
  padding: 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  align-items: center;
`;

const FakeImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${palette.skeleton};
`;

const FakeHeaderContent = styled.div`
  flex: 1;
  margin-left: 12px;

  div {
    border-radius: 12px;
    background: ${palette.skeleton};

    &:last-child {
      margin-top: 2px;
    }
  }
`;

const FakeHeader = () => {
  return (
    <FakeHeaderContainer>
      <FakeImage />
      <FakeHeaderContent>
        <div style={{ width: 64, height: 18 }}></div>
        <div style={{ width: 120, height: 16 }}></div>
      </FakeHeaderContent>
    </FakeHeaderContainer>
  );
};

export default FakeHeader;

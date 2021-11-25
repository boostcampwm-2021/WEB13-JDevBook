import React from 'react';
import styled, { css } from 'styled-components';

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
  background: ${(props) => props.theme.skeleton};
`;

const FakeHeaderContent = styled.div`
  flex: 1;
  margin-left: 12px;

  div {
    border-radius: 12px;
    background: ${(props) => props.theme.skeleton};

    &:last-child {
      margin-top: 2px;
    }
  }
`;

const FakeHeaderProblem = styled.div`
  div {
    border-radius: 12px;
    background: ${(props) => props.theme.skeleton};

    &:last-child {
      margin-top: 12px;
    }
  }
`;

const FakeHeader = ({ type }: { type: string }) => {
  return (
    <FakeHeaderContainer>
      {type === 'home' && (
        <>
          <FakeImage />
          <FakeHeaderContent>
            <div style={{ width: 64, height: 18 }}></div>
            <div style={{ width: 120, height: 16 }}></div>
          </FakeHeaderContent>
        </>
      )}
      {type === 'problem' && (
        <FakeHeaderProblem>
          <div style={{ width: 64, height: 18 }}></div>
          <div style={{ width: 120, height: 16 }}></div>
        </FakeHeaderProblem>
      )}
    </FakeHeaderContainer>
  );
};

export default FakeHeader;

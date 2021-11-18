import React from 'react';
import styled, { css } from 'styled-components';
import palette from 'theme/palette';

const FakeBodyContainer = styled.div`
  width: 100%;
  padding: 0px 24px;
  box-sizing: border-box;
  display: flex;

  div {
    flex: 1;
    height: 64px;
    border-radius: 8px;
    background: ${palette.skeleton};

    & + div {
      margin-left: 24px;
    }
  }
`;

const FakeAnswerWrap = () => {
  return (
    <>
      <FakeBodyContainer>
        <div />
        <div />
      </FakeBodyContainer>
    </>
  );
};

export default FakeAnswerWrap;

import React from 'react';
import styled, { css } from 'styled-components';
import palette from 'theme/palette';
import FakeBody from './FakeBody';
import FakeHeader from './FakeHeader';

const SkeletonContainer = styled.div`
  width: 680px;
  min-width: 680px;
  position: relative;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;
  margin-top: 24px;
  background-color: ${palette.white};
  padding-bottom: 32px;
`;

const Skeleton = () => {
  return (
    <SkeletonContainer>
      <FakeHeader />
      <FakeBody />
    </SkeletonContainer>
  );
};

export default Skeleton;

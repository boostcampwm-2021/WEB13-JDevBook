import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import palette from 'theme/palette';
import FakeAnswerWrap from './FakeAnswerWrap';
import FakeBody from './FakeBody';
import FakeHeader from './FakeHeader';

const OpacityAnimation = keyframes`
  0% { opacity: 0.15 }
  15% { opacity: 0.4 }
  100% { opacity: 1 }
`;

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

  animation: 0.3s ${OpacityAnimation};
`;

const Skeleton = ({ type = 'home' }: { type?: string }) => {
  return (
    <SkeletonContainer>
      <FakeHeader type={type} />
      {type === 'home' && <FakeBody />}
      {type === 'problem' && <FakeAnswerWrap />}
    </SkeletonContainer>
  );
};

export default Skeleton;

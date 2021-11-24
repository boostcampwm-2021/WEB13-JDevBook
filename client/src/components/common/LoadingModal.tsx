import React from 'react';
import styled, { keyframes } from 'styled-components';

import { mainLogo } from 'images';
import palette from 'theme/palette';

const LoadingModalContainer = styled.div<{ modalState: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;

  background-color: ${palette.white};
  display: ${(props) => (props.modalState ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const LoadingModal = ({ modalState }: { modalState: boolean }) => {
  return (
    <>
      <LoadingModalContainer modalState={modalState}>
        <LoadingLogo src={mainLogo} alt="메인 로고" />
        <LoadingTitle>JDevBook</LoadingTitle>
      </LoadingModalContainer>
    </>
  );
};

export default LoadingModal;

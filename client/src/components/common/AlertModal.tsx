import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { alertState } from 'recoil/store';
import palette from 'theme/palette';

const onAnimation = keyframes`
  0% {
    top: -70px;
    opacity: 0%;
  }
  25%{
    top: 20px;
    opacity: 100%;
  }
  75%{
    top: 20px;
    opacity: 100%;
  }
  100% {
    top: -70px;
    opacity: 0%;
  }
`;

const AlertModalWrap = styled.div<{ bgColor?: string; modalState: boolean }>`
  position: fixed;
  top: -70px;
  left: 50%;
  width: 500px;
  height: 50px;
  transform: translateX(-50%);
  z-index: 7;

  border-radius: 8px;
  background-color: ${(props) => props.bgColor ?? `${palette.blue}`};
  color: ${palette.white};
  animation: ${onAnimation} 2s ease;

  display: ${(props) => (props.modalState ? `flex` : `none`)};
  justify-content: center;
  align-items: center;
`;

const AlertModal = () => {
  const alert = useRecoilValue(alertState);
  const resetAlert = useResetRecoilState(alertState);

  const alertOff = (e: React.AnimationEvent) => {
    resetAlert();
  };

  return (
    <AlertModalWrap
      modalState={alert.modalState}
      bgColor={alert.bgColor}
      onAnimationEnd={alertOff}
    >
      {alert.comment}
    </AlertModalWrap>
  );
};

export default AlertModal;

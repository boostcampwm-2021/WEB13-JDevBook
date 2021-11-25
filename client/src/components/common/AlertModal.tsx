import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { alertState } from 'recoil/store';

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

const AlertModalWrap = styled.div<{ bgColor?: boolean; modalState: boolean }>`
  position: fixed;
  top: -70px;
  left: 50%;
  width: 500px;
  height: 50px;
  transform: translateX(-50%);
  z-index: 7;

  border-radius: 8px;
  background-color: ${(props) =>
    props.bgColor ? props.theme.alert : props.theme.blue};
  color: ${(props) => props.theme.white};
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
      bgColor={alert.isAlert}
      onAnimationEnd={alertOff}
    >
      {alert.comment}
    </AlertModalWrap>
  );
};

export default AlertModal;

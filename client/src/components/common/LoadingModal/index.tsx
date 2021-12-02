import styled, { keyframes } from 'styled-components';

import { mainLogo } from 'images';

const fadeIn = keyframes`
  0%{
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

const LoadingModalContainer = styled.div<{ modalState: boolean }>`
  position: fixed;
  top: 64px;
  left: 348px;
  width: calc(100vw - 696px);
  height: calc(100vh - 64px);

  background-color: ${(props) => props.theme.lightgray};
  display: ${(props) => (props.modalState ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation: ${fadeIn} 1s;
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
  color: ${(props) => props.theme.green};
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

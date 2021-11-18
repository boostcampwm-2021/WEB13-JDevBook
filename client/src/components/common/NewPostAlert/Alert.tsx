import styled, { keyframes } from 'styled-components';
import palette from 'theme/palette';

const EnterAnimation = keyframes`
  0% {
    opacity: 0%;
    height: 0;
  }
  100% {
    opacity: 100%;
    height: 36px;
  }
`;

const AlertModalWrap = styled.div`
  position: fixed;
  left: 50%;
  top: 84px;
  padding-left: 24px;
  padding-right: 24px;
  height: 36px;
  z-index: 7;
  transform: translateX(-50%);
  font-size: 14px;
  cursor: pointer;

  box-sizing: border-box;
  border-radius: 16px;
  background-color: ${palette.lightgray};
  color: black;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;
  animation: ${EnterAnimation} 0.75s ease-in-out;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Alert = ({
  count,
  setCount
}: {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const getMessage = (count: number): string => {
    if (count < 5) {
      return `${count}개`;
    }
    if (count < 10) {
      return '5개 이상';
    }
    if (count < 20) {
      return '10개 이상';
    } else return '20개 이상';
  };

  return (
    <AlertModalWrap onClick={() => setCount(0)}>
      {getMessage(count)}의 새로운 메세지
    </AlertModalWrap>
  );
};

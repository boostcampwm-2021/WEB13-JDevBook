import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { alertState } from 'recoil/common';

const AlertModalWrap = styled.div<{ bgColor?: boolean; modalState: boolean }>`
  position: fixed;
  top: ${(props) => (!props.modalState ? '-70px' : '30px')};
  transition: top 0.5s ease;
  left: 50%;
  width: 500px;
  height: 50px;
  transform: translateX(-50%);
  z-index: 7;

  border-radius: 8px;
  background-color: ${(props) => (props.bgColor ? props.theme.alert : props.theme.blue)};
  color: ${(props) => props.theme.inColorBox};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlertModal = () => {
  const alert = useRecoilValue(alertState);

  return (
    <AlertModalWrap modalState={alert.modalState} bgColor={alert.isAlert}>
      {alert.comment}
    </AlertModalWrap>
  );
};

export default AlertModal;

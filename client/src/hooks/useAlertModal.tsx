import { useRecoilState, useSetRecoilState } from 'recoil';

import { alertState, timeOutValueState } from 'recoil/common';

const useAlertModal = () => {
  const setAlertModal = useSetRecoilState(alertState);
  const [timeOutValue, setTimeOutValue] = useRecoilState(timeOutValueState);

  return (comment: string, isAlert?: boolean) => {
    setAlertModal({ comment: comment, isAlert: isAlert, modalState: true });
    if (timeOutValue !== null) {
      clearTimeout(timeOutValue);
    }
    const setTimeoutValue = setTimeout(() => {
      setAlertModal({ comment: comment, isAlert: isAlert, modalState: false });
    }, 1500);
    setTimeOutValue(Number(setTimeoutValue));
  };
};

export default useAlertModal;

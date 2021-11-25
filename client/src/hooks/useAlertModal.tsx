import { useSetRecoilState } from 'recoil';

import { alertState } from 'recoil/store';

const useAlertModal = () => {
  const setAlertModal = useSetRecoilState(alertState);

  return (comment: string, isAlert?: boolean) => {
    setAlertModal({ comment: comment, isAlert: isAlert, modalState: true });
  };
};

export default useAlertModal;

import { useRecoilState } from 'recoil';

import { alertState } from 'recoil/store';

const useAlertModal = () => {
  const [alertModal, setAlertModal] = useRecoilState(alertState);

  return (comment: string, bgColor?: string) => {
    setAlertModal({ comment: comment, bgColor: bgColor, modalState: true });
  };
};

export default useAlertModal;

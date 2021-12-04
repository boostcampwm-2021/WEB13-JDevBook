import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { profileState } from 'recoil/user';
import fetchApi from 'api/fetch';
import useModalHandler from './useModalHandler';
import { ModalHandler } from 'types/common';

const useResetProfile = () => {
  const resetProfile = useResetRecoilState(profileState);
  const setProfileData = useSetRecoilState(profileState);
  const handleModal = useModalHandler();

  const resetProfileData = async (userName: string) => {
    resetProfile();
    handleModal(ModalHandler.CLOSE_ALL);
    const { data: fetchProfileData, error } = await fetchApi.getProfile(userName);
    if (!error) setProfileData(fetchProfileData);
  };

  return (userName: string) => {
    resetProfileData(userName);
  };
};

export default useResetProfile;

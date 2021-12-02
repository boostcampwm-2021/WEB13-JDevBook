import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import { modalStateStore } from 'recoil/common';
import { profileState } from 'recoil/user';

import fetchApi from 'api/fetch';

const useResetProfile = () => {
  const resetProfile = useResetRecoilState(profileState);
  const setProfileData = useSetRecoilState(profileState);
  const [modalState, setModalState] = useRecoilState(modalStateStore);

  const resetProfileData = async (userName: string) => {
    resetProfile();
    setModalState({
      ...modalState,
      editProfile: false,
      post: { ...modalState.post, writer: false }
    });
    const { data: fetchProfileData, error } = await fetchApi.getProfile(userName);
    if (!error) setProfileData(fetchProfileData);
  };

  return (userName: string) => {
    resetProfileData(userName);
  };
};

export default useResetProfile;

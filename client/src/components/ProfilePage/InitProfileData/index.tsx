import { useEffect } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { profileState } from 'recoil/store';
import fetchApi from 'api/fetch';

const InitProfileData = ({ userName }: { userName: string }) => {
  const setProfileData = useSetRecoilState(profileState);
  const resetprofileData = useResetRecoilState(profileState);

  const fetchProfile = async (userName: string) => {
    const { data: profile, error } = await fetchApi.getProfile(userName);
    if (!error) {
      setProfileData({
        idx: profile.idx,
        nickname: profile.nickname,
        cover: profile.cover,
        bio: profile.bio
      });
    }
  };

  useEffect(() => {
    resetprofileData();
    fetchProfile(userName);
  }, [userName]);

  return <></>;
};

export default InitProfileData;

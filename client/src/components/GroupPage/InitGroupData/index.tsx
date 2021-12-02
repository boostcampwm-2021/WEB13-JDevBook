import { useEffect } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { groupState } from 'recoil/group';

import fetchApi from 'api/fetch';
import { IGroup } from 'types/group';

const InitGroupData = ({ groupIdx }: { groupIdx: number }) => {
  const setGroupData = useSetRecoilState(groupState);
  const resetGroupData = useResetRecoilState(groupState);

  const fetchGroup = async (groupIdx: number) => {
    const group: IGroup = await fetchApi.getGroup(groupIdx);
    setGroupData(group);
  };

  useEffect(() => {
    resetGroupData();
    fetchGroup(groupIdx);
  }, []);

  return <></>;
};

export default InitGroupData;

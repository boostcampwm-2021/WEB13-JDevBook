import { useRecoilState, useResetRecoilState } from 'recoil';

import { groupState } from 'recoil/store';
import { IGroup } from 'types/group';
import fetchApi from 'api/fetch';

const useResetGroup = () => {
  const resetGroup = useResetRecoilState(groupState);
  const [groupData, setGroupData] = useRecoilState(groupState);

  const resetGroupData = async (groupIdx: number) => {
    resetGroup();
    const fetchGroupData: IGroup = await fetchApi.getGroup(groupIdx);
    setGroupData(fetchGroupData);
  };

  return (groupIdx: number) => {
    resetGroupData(groupIdx);
  };
};

export default useResetGroup;

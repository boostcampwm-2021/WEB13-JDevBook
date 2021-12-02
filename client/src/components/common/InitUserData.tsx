import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { usersocketStates } from 'recoil/socket';
import { commonState, rightModalStates } from 'recoil/common';
import { userDataStates, myJoinedGroupState, solvedProblemState } from 'recoil/user';
import { postModalDataStates } from 'recoil/post';
import { groupListState } from 'recoil/group';

import { IProblem } from 'types/problem';
import { IGroup } from 'types/group';
import fetchApi from 'api/fetch';

const InitUserData = () => {
  const setUserdata = useSetRecoilState(userDataStates);
  const [postData, setPostData] = useRecoilState(postModalDataStates);
  const [groupList, setGroupList] = useRecoilState(groupListState);
  const setSolvedProblems = useSetRecoilState(solvedProblemState);
  const setJoinedGroups = useSetRecoilState(myJoinedGroupState);
  const setCommon = useSetRecoilState(commonState);
  const history = useHistory();

  const resetCommonState = useResetRecoilState(commonState);
  const resetUserdata = useResetRecoilState(userDataStates);
  const resetSolvedProblemState = useResetRecoilState(solvedProblemState);
  const resetRightModalState = useResetRecoilState(rightModalStates);
  const socket = useRecoilValue(usersocketStates);

  useEffect(() => {
    (async () => {
      const { data, error } = await fetchApi.getuserData();
      if (error) {
        resetUserdata();
        resetCommonState();
        resetSolvedProblemState();
        resetRightModalState();
        socket.emit('disconnect notify');
        history.push('/');
        alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
      } else {
        const fetchGroupList: IGroup[] = await fetchApi.getGroupList();
        setUserdata({
          name: data.nickname,
          idx: data.idx,
          profile: data.profile,
          cover: data.cover,
          bio: data.bio,
          login: true
        });
        setPostData({
          ...postData,
          useridx: data.idx,
          BTUseruseridx: { ...data }
        });
        setSolvedProblems(
          data.BTMUserProblemuseridx.map((item: IProblem) => ({
            idx: item.idx,
            groupIdx: item.groupidx
          }))
        );
        if (groupList.length === 0) setGroupList(fetchGroupList);
        setJoinedGroups(data.BTMUserGroupuseridx.map((item: IGroup) => item.idx));
        setCommon(true);
      }
    })();
  }, []);

  return <></>;
};

export default InitUserData;

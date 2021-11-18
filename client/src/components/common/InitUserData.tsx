import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import fetchApi from 'api/fetch';

import {
  userDataStates,
  usersocketStates,
  postModalDataStates,
  solvedProblemState,
  groupListState,
  myJoinedGroupState
} from 'recoil/store';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { IProblem } from 'types/problem';
import { IGroup } from 'types/group';

const InitUserData = (/*{ history }: RouteComponentProps*/) => {
  const [userdata, setUserdata] = useRecoilState(userDataStates);
  const [postData, setPostData] = useRecoilState(postModalDataStates);
  const [groupList, setGroupList] = useRecoilState(groupListState);
  const setSolvedProblems = useSetRecoilState(solvedProblemState);
  const setJoinedGroups = useSetRecoilState(myJoinedGroupState);
  //const socket = useRecoilValue(usersocketStates);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const { data, error } = await fetchApi.getuserData();
      const fetchGroupList: IGroup[] = await fetchApi.getGroupList();
      if (error) {
        alert('비정상 접근');
        history.push('/');
      } else {
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
          data.BTMUserProblemuseridx.map((item: IProblem) => item.idx)
        );
        if (groupList.length === 0) setGroupList(fetchGroupList);
        setJoinedGroups(
          data.BTMUserGroupuseridx.map((item: IGroup) => item.idx)
        );

        //socket?.emit('name', data.nickname);
      }
    })();
  }, []);

  return <></>;
};

export default InitUserData;

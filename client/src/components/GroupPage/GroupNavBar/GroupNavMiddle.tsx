import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { userDataStates, myJoinedGroupState } from 'recoil/user';
import { groupState } from 'recoil/group';

import fetchApi from 'api/fetch';
import style from 'theme/style';
import useAlertModal from 'hooks/useAlertModal';

const GroupNavMiddleWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const GroupJoinBtn = styled.div<{ joinedState: boolean }>`
  width: 120px;
  height: 20px;
  margin-right: 40px;
  padding: 8px ${style.padding.normal};

  border-radius: 8px;
  background-color: ${(props) => (props.joinedState ? props.theme.gray : props.theme.green)};
  color: ${(props) => (props.joinedState ? props.theme.black : props.theme.inColorBox)};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    filter: brightness(95%);
  }

  &:active {
    filter: brightness(90%);
    font-size: 15px;
  }
`;

const GroupNavMiddle = () => {
  const userData = useRecoilValue(userDataStates);
  const groupData = useRecoilValue(groupState);
  const [myJoinedGroup, setMyJoinedGroup] = useRecoilState(myJoinedGroupState);
  const [joinedState, setJoinedState] = useState<boolean>(false);
  const alertMessage = useAlertModal();

  const joinGroup = async (e: React.MouseEvent) => {
    const result = await fetchApi.joinGroup(userData.idx, groupData.idx);
    if (myJoinedGroup !== null) {
      if (result) {
        alertMessage(`${groupData.title} 그룹에 가입되었습니다.`);
        setMyJoinedGroup([...myJoinedGroup, groupData.idx]);
        setJoinedState(true);
      } else {
        alertMessage(`${groupData.title} 그룹을 탈퇴했습니다.`, true);
        setMyJoinedGroup(myJoinedGroup.filter((groupidx) => groupidx !== groupData.idx));
        setJoinedState(false);
      }
    }
  };

  useEffect(() => {
    if (myJoinedGroup !== null) if (myJoinedGroup.includes(groupData.idx)) setJoinedState(true);
  }, [groupData]);

  return (
    <GroupNavMiddleWrap>
      <GroupJoinBtn joinedState={joinedState} onClick={joinGroup} className="no-drag">
        {joinedState ? `그룹 탈퇴` : `그룹 가입`}
      </GroupJoinBtn>
    </GroupNavMiddleWrap>
  );
};

export default GroupNavMiddle;

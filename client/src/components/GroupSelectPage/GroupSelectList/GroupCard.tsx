import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { userDataStates, myJoinedGroupState } from 'recoil/store';
import palette from 'theme/palette';
import style from 'theme/style';
import { defaultGroup } from 'images/groupimg';
import { IGroup } from 'types/group';
import fetchApi from 'api/fetch';
import useAlertModal from 'hooks/useAlertModal';

const GroupCardWrap = styled.div`
  width: 320px;
  height: 320px;
  margin: 18px;

  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;

  display: flex;
  flex-direction: column;
`;

const GroupImg = styled(Link)`
  width: 100%;
  height: 65%;

  img {
    width: 100%;
    height: 100%;

    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;

const GroupSelectorWrap = styled.div`
  width: 100%;
  height: 35%;
  box-sizing: border-box;
  padding: ${style.padding.large};

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top: solid 1px ${palette.gray};
  background-color: ${palette.white};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const GroupName = styled.div`
  font-size: ${style.font.large};
`;

const GroupJoinBtn = styled.div`
  width: 100%;
  height: 35px;

  border-radius: 8px;
  background-color: ${palette.lightgray};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    filter: brightness(95%);
  }

  &:active {
    font-size: 15px;
    filter: brightness(90%);
  }
`;

const GroupEnterBtn = styled(Link)`
  width: 100%;
  height: 35px;

  border-radius: 8px;
  background-color: ${palette.green};

  display: flex;
  justify-content: center;
  align-items: center;
  color: ${palette.white};
  text-decoration: none;

  &:hover {
    cursor: pointer;
    filter: brightness(95%);
  }

  &:active {
    font-size: 15px;
    filter: brightness(90%);
  }
`;

const GroupCard = ({ group }: { group: IGroup }) => {
  const userData = useRecoilValue(userDataStates);
  const [myJoinedGroup, setMyJoinedGroup] = useRecoilState(myJoinedGroupState);
  const [joinedState, setJoinedState] = useState<boolean>(false);
  const alertMessage = useAlertModal();

  const groupUrl = `/group/${group.idx}`;

  const joinGroup = async (e: React.MouseEvent) => {
    const result = await fetchApi.joinGroup(userData.idx, group.idx);
    if (result && myJoinedGroup !== null) {
      alertMessage(`${group.title} 그룹에 가입되었습니다.`);
      setMyJoinedGroup([...myJoinedGroup, group.idx]);
      setJoinedState(true);
    }
  };

  useEffect(() => {
    if (myJoinedGroup?.includes(group.idx)) setJoinedState(true);
  }, [myJoinedGroup]);

  return (
    <GroupCardWrap>
      <GroupImg to={groupUrl} className="no-drag">
        <img src={group.cover || defaultGroup} alt="그룹 이미지" />
      </GroupImg>
      <GroupSelectorWrap>
        <GroupName>{group.title}</GroupName>
        {joinedState ? (
          <GroupEnterBtn to={groupUrl} className="no-drag">
            그룹 입장
          </GroupEnterBtn>
        ) : (
          <GroupJoinBtn onClick={joinGroup} className="no-drag">
            그룹 추가
          </GroupJoinBtn>
        )}
      </GroupSelectorWrap>
    </GroupCardWrap>
  );
};

export default GroupCard;

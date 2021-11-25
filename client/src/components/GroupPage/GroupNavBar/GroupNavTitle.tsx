import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { groupState } from 'recoil/store';
import style from 'theme/style';
import fetchApi from 'api/fetch';

const GroupNavTitleWrap = styled.div`
  padding-left: 40px;

  background-color: ${(props) => props.theme.white};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const GroupTitle = styled.div`
  margin-bottom: ${style.margin.small};
  font-size: ${style.font.title};
  color: ${(props) => props.theme.black};
`;

const GroupMemberNum = styled.div`
  height: 0;
  color: ${(props) => props.theme.darkgray};
`;

const GroupNavTitle = () => {
  const groupData = useRecoilValue(groupState);
  const [userNum, setUserNum] = useState<number>();

  const getUserNum = async () => {
    const fetchUserNum = await fetchApi.getUserNumInGroup(groupData.idx);
    setUserNum(fetchUserNum);
  };

  useEffect(() => {
    getUserNum();
    return () => {
      setUserNum(0);
    };
  }, [groupData.idx !== 0]);

  return (
    <GroupNavTitleWrap>
      <GroupTitle>{groupData.title}</GroupTitle>
      <GroupMemberNum>{userNum ? `멤버 ${userNum}명` : ``}</GroupMemberNum>
    </GroupNavTitleWrap>
  );
};

export default GroupNavTitle;

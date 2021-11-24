import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { groupState } from 'recoil/store';
import palette from 'theme/palette';
import style from 'theme/style';

const GroupNavTitleWrap = styled.div`
  padding-left: 40px;

  background-color: ${palette.white};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const GroupTitle = styled.div`
  margin-bottom: ${style.margin.small};
  font-size: ${style.font.title};
`;

const GroupMemberNum = styled.div`
  color: ${palette.darkgray};
`;

const GroupNavTitle = () => {
  const groupData = useRecoilValue(groupState);

  return (
    <GroupNavTitleWrap>
      <GroupTitle>{groupData.title}</GroupTitle>
      <GroupMemberNum>멤버 n명</GroupMemberNum>
    </GroupNavTitleWrap>
  );
};

export default GroupNavTitle;

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import fetchApi from 'api/fetch';
import { defaultGroup } from 'images/groupimg';
import { IGroup } from 'types/group';
import palette from 'theme/palette';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { groupState } from 'recoil/store';

const JoinedGroupCardWrap = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${palette.black};
  padding: 5px;
  margin: 0 0 20px 0;
  font-weight: bold;

  img {
    width: 50px;
    height: 50px;
    margin: 0 20px 0 0;
    border-radius: 10px;
    object-fit: cover;
  }

  &:hover {
    border-radius: 10px;
    background: ${palette.lightgray};
    transition: all 0.2s;
  }

  &:active {
    background: ${palette.gray};
  }
`;

const JoinedGroupCard = ({ group }: { group: IGroup }) => {
  const resetGroup = useResetRecoilState(groupState);
  const [groupData, setGroupData] = useRecoilState(groupState);
  const url = `/group/${group.idx}`;

  const resetGroupData = async (e: React.MouseEvent) => {
    resetGroup();
    const fetchGroupData: IGroup = await fetchApi.getGroup(group.idx);
    setGroupData(fetchGroupData);
  };

  return (
    <JoinedGroupCardWrap to={url} onClick={resetGroupData}>
      <img src={group.cover || defaultGroup} alt="cover 아이콘" />
      <p>{group.title}</p>
    </JoinedGroupCardWrap>
  );
};

export default JoinedGroupCard;

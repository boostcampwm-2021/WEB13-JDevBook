import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { defaultGroup } from 'images/groupimg';
import { IGroup } from 'types/group';
import palette from 'theme/palette';
import useResetGroup from 'hooks/useResetGroup';

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
  const resetGroup = useResetGroup();
  const url = `/group/${group.idx}`;

  const groupClickHandler = (e: React.MouseEvent) => {
    resetGroup(group.idx);
  };

  return (
    <JoinedGroupCardWrap to={url} onClick={groupClickHandler}>
      <img src={group.cover || defaultGroup} alt="cover 아이콘" />
      <p>{group.title}</p>
    </JoinedGroupCardWrap>
  );
};

export default JoinedGroupCard;

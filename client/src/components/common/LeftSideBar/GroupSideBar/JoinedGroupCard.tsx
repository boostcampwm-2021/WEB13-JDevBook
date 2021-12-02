import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { defaultGroup } from 'images/groupimg';
import { IGroup } from 'types/group';
import useResetGroup from 'hooks/useResetGroup';

const JoinedGroupCardWrap = styled(Link)`
  height: 70px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${(props) => props.theme.black};
  padding: 5px;
  margin-bottom: 20px;
  font-weight: bold;

  img {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    border-radius: 10px;
    object-fit: cover;
  }

  p {
    word-break: keep-all;
  }

  &:hover {
    border-radius: 10px;
    background: ${(props) => props.theme.lightgray};
    transition: all 0.2s;
  }

  &:active {
    background: ${(props) => props.theme.gray};
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

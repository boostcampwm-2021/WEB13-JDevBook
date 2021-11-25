import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';

import {
  groupListState,
  myJoinedGroupState,
  GroupNavState
} from 'recoil/store';
import { iconSearch } from 'images/icons';
import { IGroup } from 'types/group';

import JoinedGroupCard from './JoinedGroupCard';

const GroupSideBarContainer = styled.div`
  height: calc(100vh - 256px);
  width: inherit;
  background: ${(props) => props.theme.white};
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.15) 3px 3px 3px;
`;

const SearchBarWrap = styled.div`
  height: 40px;
  margin: 30px 40px;
  display: flex;
  background: ${(props) => props.theme.lightgray};
  border-radius: 24px;

  img {
    width: 20px;
    height: 20px;
    margin: 10px 5px 10px 15px;
  }

  input {
    width: 70%;
    outline: none;
    background: none;
    border: none;
    font-size: 1rem;
    color: ${(props) => props.theme.black};
  }
`;

const GroupList = styled.div`
  height: 100%;
  margin: 0 40px 70px 40px;

  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: scroll;
  overscroll-behavior: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const GroupSideBar = () => {
  const groupList = useRecoilValue(groupListState);
  const joinedGroupIdx = useRecoilValue(myJoinedGroupState);
  const [groupNavState, setGroupNavState] = useRecoilState(GroupNavState);
  const [joinedGroup, setJoinedGroup] = useState<IGroup[]>([]);
  const [searchGroup, setSearchGroup] = useState<IGroup[]>([]);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchGroup(
      joinedGroup.filter((group) => group.title.includes(e.target.value))
    );
  };

  useEffect(() => {
    if (joinedGroupIdx !== null) {
      setJoinedGroup(
        groupList.filter((group) => joinedGroupIdx.includes(group.idx))
      );
      setSearchGroup(
        groupList.filter((group) => joinedGroupIdx.includes(group.idx))
      );
    }
  }, [joinedGroupIdx]);

  return (
    <GroupSideBarContainer className="no-drag">
      <SearchBarWrap>
        <img src={iconSearch} alt="Search 아이콘" />
        <input type="text" placeholder="그룹 검색" onChange={searchHandler} />
      </SearchBarWrap>
      <GroupList
        onClick={() => setGroupNavState({ ...groupNavState, groupChat: false })}
      >
        {searchGroup.map((searchGroup, idx) => (
          <JoinedGroupCard key={idx} group={searchGroup} />
        ))}
      </GroupList>
    </GroupSideBarContainer>
  );
};

export default GroupSideBar;

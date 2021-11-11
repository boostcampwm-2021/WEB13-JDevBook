import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import palette from 'theme/palette';
import { defaultCover } from 'images';
import { iconSearch } from 'images/icons';

const GroupSideBarContainer = styled.div`
  flex: 1;
  width: inherit;
  background: ${palette.white};
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 5px 5px 5px;
`;

const SearchBarWrap = styled.div`
  height: 40px;
  margin: 30px 50px;
  display: flex;
  background: ${palette.lightgray};
  border-radius: 24px;

  img {
    width: 20px;
    height: 20px;
    margin: 10px 5px 10px 15px;
  }

  input {
    flex: 1;
    outline: none;
    background: none;
    border: none;
    font-size: 1rem;
    font-family: 'Spoqa Han Sans Neo';
  }
`;

const GroupList = styled.ul`
  flex: 1;
  margin: 0 50px 30px 0;
  display: flex;
  flex-direction: column;
`;

const GroupItem = styled(Link)`
  display: flex;
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
  }

  &:hover {
    border-radius: 10px;
    background: ${palette.lightgray};
    transition: all 0.2s;
  }
`;

type tempGroupType = {
  groupName: string;
  imgSrc: string;
};

const tempGroup = [
  {
    groupName: '운영체제',
    imgSrc: defaultCover
  },
  {
    groupName: '자료구조',
    imgSrc: defaultCover
  }
];

const GroupSideBar = () => {
  const [group, setGroup] = useState<tempGroupType[]>(tempGroup);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroup(
      tempGroup.filter((group) => group.groupName.includes(e.target.value))
    );
  };

  return (
    <GroupSideBarContainer>
      <SearchBarWrap>
        <img src={iconSearch} alt="Search 아이콘" />
        <input type="text" placeholder="그룹 검색" onChange={searchHandler} />
      </SearchBarWrap>
      <GroupList>
        {group.map((group, idx) => (
          <GroupItem key={idx} to="/group">
            <img src={group.imgSrc} alt="cover 아이콘" />
            <p>{group.groupName}</p>
          </GroupItem>
        ))}
      </GroupList>
    </GroupSideBarContainer>
  );
};

export default GroupSideBar;

import React from 'react';
import styled, { css } from 'styled-components';
import { useRecoilState } from 'recoil';

import { GroupNavState, rightModalStates } from 'recoil/store';
import style from 'theme/style';

const GroupNavigationWrap = styled.div`
  padding-left: ${style.padding.large};

  display: flex;
`;

const NavigationBtn = styled.div<{ isActive: boolean }>`
  width: 68px;
  height: 50px;
  margin: ${style.margin.smallest};

  border-radius: ${(props) => (props.isActive ? `0` : `8px`)};
  border-bottom-style: solid;
  border-bottom-color: ${(props) =>
    props.isActive ? props.theme.green : props.theme.white};
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.black};

  display: flex;
  justify-content: center;
  align-items: center;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.isActive ? '' : props.theme.lightgray};
  }

  &:active {
    font-size: ${(props) => (props.isActive ? `` : `15px`)};
  }
`;

const GroupNavigation = () => {
  const [navState, setNavState] = useRecoilState(GroupNavState);
  const [rightModalState, setRightModalState] =
    useRecoilState(rightModalStates);

  const selectAbout = (e: React.MouseEvent<HTMLDivElement>) => {
    setNavState({
      ...navState,
      about: true,
      problem: false
    });
  };

  const selectProblem = (e: React.MouseEvent<HTMLDivElement>) => {
    setNavState({
      ...navState,
      about: false,
      problem: true
    });
  };

  const toggleGroupChat = (e: React.MouseEvent<HTMLDivElement>) => {
    setNavState({
      ...navState,
      groupChat: !navState.groupChat
    });
    setRightModalState({
      ...rightModalState,
      rightModalFlag: false,
      messageFlag: false,
      alarmFlag: false,
      selectorFlag: false
    });
  };

  return (
    <GroupNavigationWrap>
      <NavigationBtn onClick={selectAbout} isActive={navState.about}>
        소개
      </NavigationBtn>
      <NavigationBtn onClick={selectProblem} isActive={navState.problem}>
        문제
      </NavigationBtn>
      <NavigationBtn onClick={toggleGroupChat} isActive={navState.groupChat}>
        토론
      </NavigationBtn>
    </GroupNavigationWrap>
  );
};

export default GroupNavigation;

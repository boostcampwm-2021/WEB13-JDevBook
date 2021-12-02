import React, { Dispatch, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';

import { usersocketStates } from 'recoil/socket';
import { rightModalStates, alarmState, themeState, commonState } from 'recoil/common';
import { userDataStates, solvedProblemState } from 'recoil/user';
import { GroupNavState } from 'recoil/group';

import fetchApi from 'api/fetch';
import { RightModalProps } from 'types/GNB';
import { GnbMessage, GnbAlarm, GnbLogout } from 'images/icons';

import GnbLeftItems from 'components/common/Gnb/GnbLeftItems';
import GnbCenterItems from 'components/common/Gnb/GnbCenterItems';
import ProfileCard from 'components/common/Gnb/ProfileCard';

const turnDark = keyframes`
  0%{
    left: -2px;
  }
  100%{
    left: 22px;
    background-color: #8a8c91;
  }
`;
const turnLight = keyframes`
  0%{
    left: 22px;
  }
  100%{
    left: -2px;
    background-color: #87d474;
  }
`;

const GnbContainer = styled.div<{ commonState: boolean }>`
  width: 100%;
  min-width: 720px;
  height: 56px;
  position: fixed;
  top: 0;
  z-index: 2;
  display: ${(props) => (props.commonState ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.15) 3px 3px 3px;
  background-color: ${(props) => props.theme.white};

  a {
    text-decoration: none;
  }
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:first-child) {
    margin-left: 8px;
  }
`;

const ToggleBtnWrap = styled.div`
  width: 50px;
  height: 25px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const ToggleBar = styled.div`
  position: relative;
  width: 80%;
  height: 30%;

  border-radius: 20px;
  background-color: ${(props) => props.theme.gray};
`;

const ToggleBtn = styled.div<{ themeState: string }>`
  position: absolute;
  top: -6px;
  left: ${(props) => (props.themeState === 'dark' ? '22px' : '-2px')};
  width: 20px;
  height: 20px;

  border-radius: 50%;
  background-color: ${(props) => (props.themeState === 'dark' ? props.theme.darkgray : props.theme.green)};
  animation: ${(props) =>
    props.themeState === 'dark'
      ? css`
          ${turnDark} ease 0.5s
        `
      : css`
          ${turnLight} ease 0.5s
        `};
`;

const SideButton = styled.div<{ current?: boolean }>`
  width: 40px;
  height: 40px;
  background: ${(props) => props.theme.lightgray};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.lightgreen};
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  svg path {
    ${({ current }) =>
      current
        ? css`
            fill: ${(props) => props.theme.green};
          `
        : css`
            fill: ${(props) => props.theme.black};
          `}
  }

  ${({ current }) =>
    current
      ? css`
          background-color: ${(props) => props.theme.lightestgreen};
        `
      : css`
          background-color: ${(props) => props.theme.lightgray};
        `}
`;

const AlarmBadge = styled.div`
  position: absolute;
  top: 13px;
  right: 71px;

  width: 12px;
  line-height: 12px;
  border-radius: 100%;
  text-align: center;

  cursor: pointer;
  background-color: ${(props) => props.theme.alert};
  color: white;
  font-size: 8px;
`;

const Gnb = () => {
  const userdata = useRecoilValue(userDataStates);
  const resetUserdata = useResetRecoilState(userDataStates);
  const resetSolvedProblemState = useResetRecoilState(solvedProblemState);
  const [rightModalState, setRightModalState] = useRecoilState(rightModalStates);
  const [groupNavState, setGroupNavState] = useRecoilState(GroupNavState);
  const [alarmNum, setAlarmNum] = useRecoilState(alarmState);
  const [theme, setTheme] = useRecoilState(themeState);
  const socket = useRecoilValue(usersocketStates);
  const [commonDisplay, setCommonDisplay] = useRecoilState(commonState);
  const history = useHistory();

  const themeToggleHandler = (e: React.MouseEvent) => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {}, [alarmNum]);

  socket.off('get alarm');
  socket.on('get alarm', (data: { sender: string; receiver: string; type: string }) => {
    if (data.receiver === userdata.name && data.sender !== userdata.name) setAlarmNum(alarmNum + 1);
  });

  return (
    <GnbContainer commonState={commonDisplay} className="no-drag">
      <GnbLeftItems />
      <GnbCenterItems />
      <FlexBox>
        <ToggleBtnWrap onClick={themeToggleHandler}>
          <ToggleBar>
            <ToggleBtn themeState={theme} />
          </ToggleBar>
        </ToggleBtnWrap>
        <ProfileCard name={userdata.name} />
        <SideButton
          current={rightModalState.messageFlag === true}
          onClick={() => {
            ChangeFlag(rightModalState, setRightModalState, 'messageFlag');
            setGroupNavState({
              ...groupNavState,
              groupChat: false
            });
          }}
        >
          <GnbMessage />
        </SideButton>
        <SideButton
          current={rightModalState.alarmFlag === true}
          onClick={() => {
            ChangeFlag(rightModalState, setRightModalState, 'alarmFlag');
            setAlarmNum(0);
            socket.emit('make alarms check', { receiver: userdata.name });
          }}
        >
          <GnbAlarm />
        </SideButton>
        <AlarmBadge
          onClick={() => {
            ChangeFlag(rightModalState, setRightModalState, 'alarmFlag');
            setAlarmNum(0);
            socket.emit('make alarms check', { receiver: userdata.name });
          }}
        >
          {alarmNum ? alarmNum : null}
        </AlarmBadge>
        <SideButton
          onClick={async () => {
            ChangeFlag(rightModalState, setRightModalState, '');
            await fetchApi.logout();
            resetUserdata();
            setCommonDisplay(false);
            resetSolvedProblemState();
            socket.emit('disconnect notify');
            history.push('/');
          }}
        >
          {<GnbLogout />}
        </SideButton>
      </FlexBox>
    </GnbContainer>
  );
};

function ChangeFlag(rightModalState: RightModalProps, setRightModalState: Dispatch<RightModalProps>, e: string): void {
  if (!rightModalState.rightModalFlag || !rightModalState[e]) {
    setRightModalState({
      rightModalFlag: true,
      messageFlag: false,
      alarmFlag: false,
      selectorFlag: false,
      [e]: true
    });
  } else {
    setRightModalState({
      ...rightModalState,
      rightModalFlag: false,
      [e]: false
    });
  }
}

export default Gnb;

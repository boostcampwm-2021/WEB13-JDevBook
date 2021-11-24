import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  rightModalStates,
  usersocketStates,
  userDataStates,
  alarmState
} from 'recoil/store';

import { ClickableProfilePhoto } from 'components/common';
import palette from 'theme/palette';
import style from 'theme/style';

const OpenAlarmAnimation = keyframes`
  0% { opacity: 0; transform: translateX(100px); }
  100% { opacity: 1; transform: translateX(0px); }
`;

const CloseAlarmAnimation = keyframes`
  0% { opacity: 1; transform: translateX(0px); }
  100% { opacity: 0; transform: translateX(100px); }
`;

const AlarmSideBarContainer = styled.div<{
  rightModalFlag: boolean;
  alarmFlag: boolean;
}>`
  position: fixed;
  top: 56px;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 340px;
  height: calc(100% - 56px);

  visibility: ${(props) =>
    props.rightModalFlag && props.alarmFlag ? `` : `hidden`};
  transition: ${(props) =>
    props.rightModalFlag && props.alarmFlag ? `` : `all .5s`};

  animation-name: ${(props) =>
    props.rightModalFlag && props.alarmFlag
      ? css`
          ${OpenAlarmAnimation}
        `
      : css`
          ${CloseAlarmAnimation}
        `};
  animation-duration: 0.5s;
  animation-fill-mode: forwards;

  overscroll-behavior: none;
  background-color: ${palette.white};
  box-shadow: -5px 2px 5px 0px rgb(0 0 0 / 24%);

  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const AlarmBox = styled.div`
  display: flex;
  padding: ${style.padding.normal} ${style.padding.normal}
    ${style.padding.normal} ${style.padding.normal};
  :hover {
    background-color: ${palette.lightgray};
    border-radius: 10px;
  }
`;
const AlarmText = styled.div`
  margin-top: ${style.margin.small};
  margin-left: ${style.margin.small};
  word-break: break-word;
  font-size: 14px;
`;

const AlarmSideBar = () => {
  const [alarmList, setAlarmList] = useState<string[]>([]);
  const rightModalState = useRecoilValue(rightModalStates);
  const currentUserName = useRecoilValue(userDataStates).name;
  const [alarmNum, setAlarmNum] = useRecoilState(alarmState);
  const socket = useRecoilValue(usersocketStates);

  socket.off('get alarm info');
  socket.on(
    'get alarm info',
    (data: { sender: string; receiver: string; type: string }) => {
      if (data.receiver === currentUserName && data.sender !== currentUserName)
        setAlarmList((alarmList: string[]) =>
          alarmList.concat(`${data.sender}:${data.type}`)
        );
    }
  );

  useEffect(() => {
    if (currentUserName !== '' && socket !== null) {
      setAlarmList([]);
      socket.emit('send alarm initial', { receiver: currentUserName });
      socket.on('get previous alarms', (previousAlarms: string[]) => {
        setAlarmList((alarmList: string[]) => alarmList.concat(previousAlarms));
        socket.off('get previous alarms');
      });
      socket.on('get number of unchecked alarms', (data: number) => {
        setAlarmNum(data);
        socket.off('get number of unchecked alarms');
      });
    }
  }, [currentUserName]);

  const alarmListView = alarmList
    .map((alarm, idx) => (
      <AlarmBox key={idx}>
        <ClickableProfilePhoto userName={alarm.split(':')[0]} size={'60px'} />
        <AlarmText>
          {alarm.split(':')[1] === 'post'
            ? `${alarm.split(':')[0]} 님이 내 게시물에 댓글을 달았습니다.`
            : `${alarm.split(':')[0]} 님으로부터 메시지가 도착했습니다.`}
        </AlarmText>
      </AlarmBox>
    ))
    .reverse();

  return (
    <AlarmSideBarContainer
      rightModalFlag={rightModalState.rightModalFlag}
      alarmFlag={rightModalState.alarmFlag}
    >
      {alarmListView}
    </AlarmSideBarContainer>
  );
};

export default AlarmSideBar;

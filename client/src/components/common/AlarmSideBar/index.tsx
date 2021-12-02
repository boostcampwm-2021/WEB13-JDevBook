import { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { usersocketStates } from 'recoil/socket';
import { rightModalStates, alarmState } from 'recoil/common';
import { userDataStates } from 'recoil/user';

import messageAudio from '../../../sounds/message-notify.mp3';
import commentAudio from '../../../sounds/comment-notify.mp3';

import AlarmListView from './AlarmListView';

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
  z-index: 1;

  will-change: transform, opacity;

  visibility: ${(props) => (props.rightModalFlag && props.alarmFlag ? `` : `hidden`)};
  transition: ${(props) => (props.rightModalFlag && props.alarmFlag ? `` : `all .5s`)};

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
  background-color: ${(props) => props.theme.white};
  box-shadow: rgba(0, 0, 0, 0.15) -3px 3px 3px;

  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const AlarmSideBar = () => {
  const [alarmList, setAlarmList] = useState<string[]>([]);
  const socket = useRecoilValue(usersocketStates);
  const rightModalState = useRecoilValue(rightModalStates);
  const currentUserName = useRecoilValue(userDataStates).name;
  const setAlarmNum = useSetRecoilState(alarmState);

  socket.off('get alarm info');
  socket.on('get alarm info', (data: { sender: string; receiver: string; type: string; text: string }) => {
    if (data.receiver === currentUserName && data.sender !== currentUserName) {
      setAlarmList((alarmList: string[]) => alarmList.concat(`${data.sender}:${data.type}:${data.text}`));
    }

    if (data.receiver === currentUserName && data.type === 'post') {
      const audio = new Audio(commentAudio);
      audio.volume = 0.2;
      audio.play();
    } else if (data.receiver === currentUserName && data.sender !== currentUserName && data.type === 'chat') {
      const audio = new Audio(messageAudio);
      audio.volume = 0.2;
      audio.play();
    }
  });

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

  return (
    <AlarmSideBarContainer rightModalFlag={rightModalState.rightModalFlag} alarmFlag={rightModalState.alarmFlag}>
      <AlarmListView alarmList={alarmList} />
    </AlarmSideBarContainer>
  );
};

export default AlarmSideBar;

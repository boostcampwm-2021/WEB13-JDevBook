import React, { Dispatch, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';

import {
  modalStateStore,
  rightModalStates,
  solvedProblemState,
  userDataStates,
  GroupNavState,
  alarmState,
  usersocketStates,
  themeState,
  animationState
} from 'recoil/store';
import fetchApi from 'api/fetch';
import {
  GnbProps,
  FlexProps,
  TabProps,
  IconProps,
  RightModalProps
} from 'types/GNB';
import palette from 'theme/palette';
import {
  GnbHome,
  GnbGroup,
  GnbHomeActive,
  GnbGroupActive,
  gnbMessage,
  gnbMessageActive,
  gnbAlarm,
  gnbAlarmActive,
  gnbLogout
} from 'images/icons';

import {
  UserSearchBar,
  UserSearchModal,
  ProfilePhoto
} from 'components/common';
import useResetProfile from 'hooks/useResetProfile';

const GnbContainer = styled.div`
  width: 100%;
  min-width: 720px;
  height: 56px;
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: ${(props) => props.theme.white};

  a {
    text-decoration: none;
  }
`;

const FlexWrap = styled.div<FlexProps>`
  display: flex;
  align-items: center;

  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ center }) =>
    center &&
    css`
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      @media screen and (max-width: 852px) {
        margin-left: 20px;
      }
    `}
`;

const GnbTab = styled.div<TabProps>`
  width: 112px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color border-radius 0.1s ease-in;

  &:hover {
    background-color: ${(props) => props.theme.lightgray};
    border-radius: 8px;
  }

  &:active {
    background-color: ${(props) => props.theme.gray};
  }

  svg path {
    ${({ current }) =>
      current
        ? css`
            fill: ${(props) => props.theme.green};
          `
        : css`
            fill: ${(props) => props.theme.darkgray};
          `}
  }

  @media screen and (max-width: 852px) {
    width: 60px;
    height: 48px;
  }
`;

const ProfileWrap = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  padding-left: 4px;
  padding-right: 12px;

  &:hover {
    background-color: ${(props) => props.theme.lightgray};
    border-radius: 24px;
  }

  &:active {
    background-color: ${(props) => props.theme.gray};
  }

  p {
    color: ${(props) => props.theme.black};
    margin-left: 8px;
    font-size: 1rem;
    font-weight: bold;
  }

  @media screen and (max-width: 852px) {
    padding: 0px;
    p {
      display: none;
      margin-left: 0px;
    }
    img {
      width: 36px;
      height: 36px;

      &:hover {
        filter: brightness(90%);
      }

      &:active {
        filter: brightness(80%);
      }
    }
  }
`;

const IconWrap = styled.div<IconProps>`
  width: 40px;
  height: 40px;
  background: ${(props) => props.theme.lightgray};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${({ img }) =>
    img.match('active')
      ? css`
          ${(props) => props.theme.lightestgreen}
        `
      : ``};

  &:after {
    content: '';
    background-image: url(${({ img }) => img});
    background-size: 20px 20px;
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: ${({ img }) =>
      img.match('active')
        ? css`
            ${(props) => props.theme.lightgreen}
          `
        : css`
            ${(props) => props.theme.gray};
          `};
  }

  &:active {
    transform: scale(0.95);
  }
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

const turnDark = keyframes`
  0%{
    left: -2px;
  }
  100%{
    left: 22px;
    background-color: ${palette.darkgray};
  }
`;
const turnLight = keyframes`
  0%{
    left: 22px;
  }
  100%{
    left: -2px;
    background-color: ${palette.green};
  }
`;

const ToggleBtn = styled.div<{ themeState: string; animationState: boolean }>`
  position: absolute;
  top: -6px;
  left: ${(props) => (props.themeState === 'dark' ? '22px' : '-2px')};
  width: 20px;
  height: 20px;

  border-radius: 50%;
  background-color: ${(props) =>
    props.themeState === 'dark' ? props.theme.darkgray : props.theme.green};
  animation: ${(props) =>
    props.animationState &&
    (props.themeState === 'dark'
      ? css`
          ${turnDark} ease 0.5s
        `
      : css`
          ${turnLight} ease 0.5s
        `)};
`;

const Gnb = ({ type, rightModalType }: GnbProps) => {
  const modalState = useRecoilValue(modalStateStore);
  const [userdata, setUserdata] = useRecoilState(userDataStates);
  const resetSolvedProblemState = useResetRecoilState(solvedProblemState);
  const [rightModalState, setRightModalState] =
    useRecoilState(rightModalStates);
  const [groupNavState, setGroupNavState] = useRecoilState(GroupNavState);
  const [alarmNum, setAlarmNum] = useRecoilState(alarmState);
  const [theme, setTheme] = useRecoilState(themeState);
  const socket = useRecoilValue(usersocketStates);
  const [animation, setAnimaition] = useRecoilState(animationState);
  const history = useHistory();
  const resetProfile = useResetProfile();

  const photoClickHandler = (e: React.MouseEvent) => {
    resetProfile(userdata.name);
  };

  const themeToggleHandler = (e: React.MouseEvent) => {
    setAnimaition(true);
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const animationEnd = (e: React.AnimationEvent) => {
    setAnimaition(false);
  };

  useEffect(() => {}, [alarmNum]);

  socket.off('get alarm');
  socket.on(
    'get alarm',
    (data: { sender: string; receiver: string; type: string }) => {
      if (data.receiver === userdata.name && data.sender !== userdata.name)
        setAlarmNum(alarmNum + 1);
    }
  );

  return (
    <GnbContainer className="no-drag">
      <FlexWrap>
        {modalState.searchUser ? <UserSearchModal /> : <UserSearchBar />}
      </FlexWrap>
      <FlexWrap center>
        <Link to="/home">
          <GnbTab current={type === 'home'}>
            {type === 'home' ? <GnbHomeActive /> : <GnbHome />}
          </GnbTab>
        </Link>
        <Link to="/groupselect">
          <GnbTab current={type === 'group'}>
            {type === 'group' ? <GnbGroupActive /> : <GnbGroup />}
          </GnbTab>
        </Link>
      </FlexWrap>
      <FlexWrap>
        <ToggleBtnWrap onClick={themeToggleHandler}>
          <ToggleBar>
            <ToggleBtn
              animationState={animation}
              themeState={theme}
              onAnimationEnd={animationEnd}
            />
          </ToggleBar>
        </ToggleBtnWrap>
        <Link to={`/profile/${userdata.name}`} onClick={photoClickHandler}>
          <ProfileWrap>
            <ProfilePhoto userName={userdata.name} size="28px" />
            <p>{userdata.name}</p>
          </ProfileWrap>
        </Link>
        <IconWrap
          img={rightModalState.messageFlag ? gnbMessageActive : gnbMessage}
          onClick={() => {
            ChangeFlag(rightModalState, setRightModalState, 'messageFlag');
            setGroupNavState({
              ...groupNavState,
              groupChat: false
            });
          }}
        />
        <IconWrap
          img={rightModalState.alarmFlag ? gnbAlarmActive : gnbAlarm}
          onClick={() => {
            ChangeFlag(rightModalState, setRightModalState, 'alarmFlag');
            setAlarmNum(0);
            socket.emit('make alarms check', { receiver: userdata.name });
          }}
        />
        <AlarmBadge
          onClick={() => {
            ChangeFlag(rightModalState, setRightModalState, 'alarmFlag');
            setAlarmNum(0);
            socket.emit('make alarms check', { receiver: userdata.name });
          }}
        >
          {alarmNum ? alarmNum : null}
        </AlarmBadge>
        <IconWrap
          img={gnbLogout}
          onClick={async () => {
            ChangeFlag(rightModalState, setRightModalState, '');
            await fetchApi.logout();
            setUserdata({
              idx: -1,
              name: '',
              profile: '' as string,
              cover: '' as string,
              bio: '' as string,
              login: false
            });
            resetSolvedProblemState();
            socket.emit('disconnect notify');
            history.push('/');
          }}
        />
      </FlexWrap>
    </GnbContainer>
  );
};

function ChangeFlag(
  rightModalState: RightModalProps,
  setRightModalState: Dispatch<RightModalProps>,
  e: string
): void {
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

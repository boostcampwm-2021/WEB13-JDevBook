import React, { Dispatch } from 'react';
import styled, { css } from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import {
  modalStateStore,
  rightModalStates,
  solvedProblemState,
  userDataStates,
  GroupNavState
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
  gnbSelector,
  gnbSelectorActive
} from 'images/icons';

import {
  UserSearchBar,
  UserSearchModal,
  ProfilePhoto
} from 'components/common';

const GnbContainer = styled.div`
  width: 100%;
  height: 56px;
  position: fixed;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: ${palette.white};
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

      @media screen and (max-width: 800px) {
        display: none;
      }
    `}
`;

const GnbTab = styled.div<TabProps>`
  width: 112px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.1s ease-in;

  &:hover {
    background-color: ${palette.lightgray};
    border-radius: 8px;
  }

  &:active {
    background-color: ${palette.gray};
  }

  svg path {
    ${({ current }) =>
      current &&
      css`
        fill: ${palette.green};
      `}
  }
`;

const ProfileWrap = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  padding-left: 4px;
  padding-right: 12px;

  &:hover {
    background-color: ${palette.lightgray};
    border-radius: 24px;
  }

  &:active {
    background-color: ${palette.gray};
  }

  p {
    color: ${palette.black};
    margin-left: 8px;
    font-size: 1rem;
    font-weight: bold;
  }
`;

const IconWrap = styled.div<IconProps>`
  width: 40px;
  height: 40px;
  background: ${palette.lightgray};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:after {
    content: '';
    background-image: url(${({ img }) => img});
    background-size: 20px 20px;
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: ${palette.lightgray};
  }

  &:active {
    background-color: ${palette.gray};
  }
`;

const Gnb = ({ type, rightModalType }: GnbProps) => {
  const modalState = useRecoilValue(modalStateStore);
  const [userdata, setUserdata] = useRecoilState(userDataStates);
  const resetSolvedProblemState = useResetRecoilState(solvedProblemState);
  const [rightModalState, setRightModalState] =
    useRecoilState(rightModalStates);
  const [groupNavState, setGroupNavState] = useRecoilState(GroupNavState);
  const history = useHistory();

  return (
    <GnbContainer>
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
        <Link to="/profile/1">
          <ProfileWrap>
            <ProfilePhoto size="28px" />
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
          onClick={() =>
            ChangeFlag(rightModalState, setRightModalState, 'alarmFlag')
          }
        />
        <IconWrap
          img={rightModalState.selectorFlag ? gnbSelectorActive : gnbSelector}
          onClick={async () => {
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

import React, { Dispatch } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { modalVisibleStates, rightModalStates, userData } from 'recoil/modal';
import { ReactComponent as GnbHome } from 'images/gnb-home.svg';
import { ReactComponent as GnbGroup } from 'images/gnb-group.svg';
import { ReactComponent as GnbHomeActive } from 'images/gnb-home-active.svg';
import { ReactComponent as GnbGroupActive } from 'images/gnb-group-active.svg';
import gnbMessage from 'images/gnb-message.svg';
import gnbAlarm from 'images/gnb-alarm.svg';
import gnbSelector from 'images/gnb-down-arrow.svg';
import profileDefault from 'images/profile-default.png';
import { UserSearchBar, UserSearchModal } from '..';
import {
  GnbProps,
  FlexProps,
  TabProps,
  IconProps,
  RightModalProps
} from 'utils/types';

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

  a {
    text-decoration: none;
  }

  img {
    width: 36px;
    height: 36px;
  }
  z-index: 1;
`;

const FlexWrap = styled.div<FlexProps>`
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    vertical-align: bottom;
  }

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
    background: #f2f2f2;
    border-radius: 8px;
  }

  svg path {
    ${({ current }) =>
      current &&
      css`
        fill: #87d474;
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
    background: #f0f2f5;
    border-radius: 24px;
  }

  img {
    border: 1px solid #bbbbbb;
    border-radius: 50%;
    width: 28px;
    height: 28px;
  }

  p {
    color: black;
    margin-left: 8px;
    font-size: 1rem;
    font-weight: bold;
  }
`;

const IconWrap = styled.div<IconProps>`
  width: 40px;
  height: 40px;
  background: #e4e6eb;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:after {
    content: '';
    background-image: url(${({ img }) => img});
    background-size: 20px 20px;
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: #d8dadf;
  }
`;

const Gnb: React.FC<GnbProps> = ({ type }) => {
  const modalState = useRecoilValue(modalVisibleStates);
  const userdata = useRecoilValue(userData);
  const [rightModalState, setRightModalState] =
    useRecoilState(rightModalStates);

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
        <Link to="/group">
          <GnbTab current={type === 'group'}>
            {type === 'group' ? <GnbGroupActive /> : <GnbGroup />}
          </GnbTab>
        </Link>
      </FlexWrap>
      <FlexWrap>
        <Link to="/profile/1">
          <ProfileWrap>
            <img src={profileDefault} />
            <p>{userdata.username}</p>
          </ProfileWrap>
        </Link>
        <IconWrap
          img={gnbMessage}
          onClick={() =>
            ChangeFlag(rightModalState, setRightModalState, 'messageFlag')
          }
        />
        <IconWrap
          img={gnbAlarm}
          onClick={() =>
            ChangeFlag(rightModalState, setRightModalState, 'alarmFlag')
          }
        />
        <IconWrap
          img={gnbSelector}
          onClick={() =>
            ChangeFlag(rightModalState, setRightModalState, 'selectorFlag')
          }
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

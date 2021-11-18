import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { useRecoilValue, useRecoilState } from 'recoil';
import { usersocketStates, userDataStates, chatWith } from 'recoil/store';

import getData from 'api/fetch';
import { defaultProfile } from 'images';
import ProfilePhoto from 'components/common/ProfilePhoto';
import palette from 'theme/palette';
import style from 'theme/style';
import { UserSocket } from 'types/common';

const ClickableProfileImage = styled(ProfilePhoto)``;

const CurrentUserWrapper = styled.div`
  width: inherit;
  height: 300px;

  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;

    margin-left: ${style.margin.small};
    margin-right: ${style.margin.small};
  }
`;

const CurrentUserBox = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    border-radius: 10px;
    background: ${palette.lightgray};
  }
`;

const LoginState = styled.div<{ user: string; loginStateArray: any }>`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  margin-right: ${style.margin.small};
  ${(props) =>
    `background-color: ${
      props.loginStateArray?.includes(props.user)
        ? `${palette.green}`
        : `${palette.darkgray}`
    };`}
`;

const CurrentUser = () => {
  const socket = useRecoilValue(usersocketStates);
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [chatReceiver, setChatWith] = useRecoilState(chatWith);
  const currentUserName = useRecoilValue(userDataStates).name;
  const [usersLoginState, setUsersLoginState] = useState<UserSocket>({});
  const [loginStateArray, setLoginStateArray] = useState<string[]>();

  useEffect(() => {
    const fetchJob = setTimeout(async () => {
      const users = await getData.getAllUsers();
      const usersInfo = users.map(
        (user: { idx: number; nickname: string }) => user.nickname
      );
      setAllUsers(usersInfo);
      return () => clearTimeout(fetchJob);
    }, 0);
  }, []);

  useEffect(() => {
    if (currentUserName) {
      socket.emit('login notify', {
        socketId: socket.id,
        userName: currentUserName
      });
      socket.off('get current users');
      socket.on('get current users', (userData: UserSocket) => {
        setUsersLoginState(userData);
      });
    }
  }, [currentUserName]);

  useEffect(() => {
    const usersLoginStateArray = Object.values(usersLoginState);
    setLoginStateArray(usersLoginStateArray);
  }, [usersLoginState]);

  const UserList = allUsers.map((user: string, idx: number) => (
    <CurrentUserBox
      key={idx}
      className="User"
      onClick={() => setChatWith(user)}
    >
      <ClickableProfileImage size={'30px'} />
      <LoginState user={user} loginStateArray={loginStateArray} />
      {user}
    </CurrentUserBox>
  ));

  return <CurrentUserWrapper>{UserList}</CurrentUserWrapper>;
};

export default CurrentUser;

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import { usersocketStates, chatWith } from 'recoil/socket';
import { loginState } from 'recoil/common';
import { userDataStates } from 'recoil/user';
import { usersNumState } from 'recoil/group';

import getData from 'api/fetch';
import style from 'theme/style';
import { UserSocket } from 'types/common';

import { ClickableProfilePhoto } from 'components/common';

const CurrentUserWrapper = styled.div`
  width: inherit;
  height: 210px;

  overflow-x: hidden;
  overflow-y: scroll;
  overscroll-behavior: none;

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
    background: ${(props) => props.theme.lightgray};
  }
`;

const LoginState = styled.div<{ user: string; loginStateArray: any }>`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  margin-right: ${style.margin.small};
  ${(props) =>
    `background-color: ${props.loginStateArray?.includes(props.user) ? props.theme.green : props.theme.darkgray};`}
`;

const CurrentUser = () => {
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [usersLoginState, setUsersLoginState] = useState<UserSocket>({});
  const [loginStateArray, setLoginStateArray] = useRecoilState(loginState);
  const socket = useRecoilValue(usersocketStates);
  const currentUserName = useRecoilValue(userDataStates).name;
  const setUsersNum = useSetRecoilState(usersNumState);
  const setChatWith = useSetRecoilState(chatWith);

  useEffect(() => {
    const fetchJob = setTimeout(async () => {
      const users = await getData.getAllUsers();
      const usersInfo = users.map((user: { idx: number; nickname: string }) => user.nickname);
      setAllUsers(usersInfo);
      setUsersNum(usersInfo.length);
      return () => clearTimeout(fetchJob);
    }, 0);
  }, [usersLoginState]);

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
    <CurrentUserBox key={idx} className="User" onClick={() => setChatWith(user)}>
      <ClickableProfilePhoto userName={user} size={'30px'} />
      <LoginState user={user} loginStateArray={loginStateArray} />
      {user}
    </CurrentUserBox>
  ));

  return <CurrentUserWrapper>{UserList}</CurrentUserWrapper>;
};

export default CurrentUser;

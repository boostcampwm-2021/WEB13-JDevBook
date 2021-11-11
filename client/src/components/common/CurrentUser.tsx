import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useRecoilState } from 'recoil';
import { chatWith } from 'recoil/store';

import getData from 'api/fetch';
import { defaultProfile } from 'images';
import palette from 'theme/palette';

const CurrentUserWrapper = styled.div`
  width: inherit;
  height: 320px;

  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;

    margin-left: 7px;
    margin-right: 7px;
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
    background: ${palette.gray};
  }
`;

const CurrentUser = () => {
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [chatReceiver, setChatWith] = useRecoilState(chatWith);

  useEffect(() => {
    const fetchJob = setTimeout(async () => {
      const users = await getData.getAllUsers();
      const usersInfo = users.map(
        (user: { idx: number; nickname: string }) => user.nickname
      );
      setAllUsers(usersInfo);
      // 새로운 유저는 소켓으로 받아오도록
      return () => clearTimeout(fetchJob);
    }, 0);
  }, []);

  const UserList = allUsers.map((user: string, idx: number) => (
    <CurrentUserBox
      key={idx}
      className="User"
      onClick={() => setChatWith(user)}
    >
      <img src={defaultProfile} />
      {user}
    </CurrentUserBox>
  ));

  return <CurrentUserWrapper>{UserList}</CurrentUserWrapper>;
};

export default CurrentUser;

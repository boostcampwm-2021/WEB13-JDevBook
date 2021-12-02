import { useState, useEffect, FormEvent } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';

import { usersocketStates } from 'recoil/socket';
import { userDataStates } from 'recoil/user';
import { GroupNavState } from 'recoil/group';

import style from 'theme/style';

import CurrentUserTitle from 'components/GroupPage/GroupChat/CurrentUserTitle';
import CurrentUserContainer from 'components/GroupPage/GroupChat/CurrentUserContainer';
import ChatTitle from 'components/GroupPage/GroupChat/ChatTitle';
import ChatListView from 'components/GroupPage/GroupChat/ChatList';
import ChatInput from 'components/GroupPage/GroupChat/ChatInput';

const OpenChatAnimation = keyframes`
  0% { opacity: 0; transform: translateX(100px); }
  100% { opacity: 1; transform: translateX(0px); }
`;

const CloseChatAnimation = keyframes`
  0% { opacity: 1; transform: translateX(0px); }
  100% { opacity: 0; transform: translateX(100px); }
`;

const ChatSideBarContainer = styled.div<{ groupChatFlag: boolean }>`
  position: fixed;
  top: 56px;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 340px;
  height: calc(100% - 56px);

  will-change: transform, opacity;

  visibility: ${(props) => (props.groupChatFlag ? `` : `hidden`)};
  transition: ${(props) => (props.groupChatFlag ? `` : `all .5s`)};
  animation-name: ${(props) =>
    props.groupChatFlag
      ? css`
          ${OpenChatAnimation}
        `
      : css`
          ${CloseChatAnimation}
        `};
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  color: ${(props) => props.theme.black};

  background-color: ${(props) => props.theme.white};
  box-shadow: rgba(0, 0, 0, 0.15) -3px 3px 3px;
`;

const Divider = styled.div`
  width: calc(100% - 32px);
  height: 1px;
  background: #dddddd;
  margin: ${style.margin.normal} ${style.margin.large};
  box-shadow: 0 -2px 5px 0;
`;

const GroupChat = ({ groupIdx }: { groupIdx: number }) => {
  const [groupNavState, setGroupNavState] = useRecoilState(GroupNavState);
  const [messageList, setMessageList] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');
  const [allUsers, setAllUsers] = useState<string[]>([]);

  const socket = useRecoilValue(usersocketStates);
  const currentUserName = useRecoilValue(userDataStates).name;

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (socket !== null) {
      socket.emit('send group message', {
        sender: currentUserName,
        groupidx: groupIdx,
        message: value
      });
    }
  };

  useEffect(() => {
    socket.emit('enter group notify', {
      groupidx: groupIdx
    });
    socket.on('get group users', (data: string[]) => {
      setAllUsers(data);
      socket.off('get group users');
    });
  }, []);

  useEffect(() => {
    setMessageList([]);
    socket.emit('send group chat initial', {
      sender: currentUserName,
      groupidx: groupIdx
    });

    socket.on('get previous group chats', (filteredMsgs: string[]) => {
      setMessageList((messageList: string[]) => messageList.concat(filteredMsgs));
      socket.off('get previous group chats');
      document.querySelector('.group-chat-list')?.scrollBy({
        top: document.querySelector('.group-chat-list')?.scrollHeight,
        behavior: 'smooth'
      });
    });

    socket.off('receive group message');
    socket.on('receive group message', (data: { sender: string; groupidx: number; msg: string }) => {
      const { groupidx, msg } = data;
      if (groupidx === groupIdx) {
        setMessageList((messageList: string[]) => messageList.concat(msg));
      }
      document.querySelector('.group-chat-list')?.scrollBy({
        top: document.querySelector('.group-chat-list')?.scrollHeight,
        behavior: 'smooth'
      });
    });
  }, [socket, groupIdx]);

  useEffect(() => {
    return () => setGroupNavState({ ...groupNavState, groupChat: false });
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      submit(e);
      setValue('');
    }
  };

  return (
    <ChatSideBarContainer groupChatFlag={groupNavState.groupChat}>
      <CurrentUserTitle />
      <CurrentUserContainer allUsers={allUsers} />
      <Divider />
      <ChatTitle />
      <ChatListView messageList={messageList} />
      <form onSubmit={onSubmit}>
        <ChatInput value={value} setValue={setValue} allUsers={allUsers} />
      </form>
    </ChatSideBarContainer>
  );
};

export default GroupChat;

import { useState, useEffect, FormEvent } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { usersocketStates, chatWith } from 'recoil/socket';
import { userDataStates } from 'recoil/user';
import { rightModalStates } from 'recoil/common';

import style from 'theme/style';
import { ISocketMessage } from 'types/message';

import CurrentUser from 'components/common/ChatSideBar/CurrentUser';
import ChatListView from 'components/common/ChatSideBar/ChatList';
import CurrentUserTitle from 'components/common/ChatSideBar/CurrentUserTitle';
import ChatTitle from 'components/common/ChatSideBar/ChatTitle';
import ChatInput from 'components/common/ChatSideBar/ChatInput';

const OpenChatAnimation = keyframes`
  0% { opacity: 0; transform: translateX(100px); }
  100% { opacity: 1; transform: translateX(0px); }
`;

const CloseChatAnimation = keyframes`
  0% { opacity: 1; transform: translateX(0px); }
  100% { opacity: 0; transform: translateX(100px); }
`;

const ChatSideBarContainer = styled.div<{
  rightModalFlag: boolean;
  messageFlag: boolean;
}>`
  position: fixed;
  top: 56px;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 340px;
  height: calc(100% - 56px);
  z-index: 1;

  visibility: ${(props) => (props.rightModalFlag && props.messageFlag ? `` : `hidden`)};
  transition: ${(props) => (props.rightModalFlag && props.messageFlag ? `` : `all .5s`)};
  will-change: transform, opacity;

  animation-name: ${(props) =>
    props.rightModalFlag && props.messageFlag
      ? css`
          ${OpenChatAnimation}
        `
      : css`
          ${CloseChatAnimation}
        `};
  animation-duration: 0.5s;
  animation-fill-mode: forwards;

  overscroll-behavior: none;
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.black};
  box-shadow: rgba(0, 0, 0, 0.15) -3px 3px 3px;
`;

const Divider = styled.div`
  width: calc(100% - 32px);
  height: 1px;
  background: #dddddd;
  margin: ${style.margin.normal} ${style.margin.large};
  box-shadow: 0 -2px 5px 0;
`;

const ChatSideBar = () => {
  const [messageList, setMessageList] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');

  const rightModalState = useRecoilValue(rightModalStates);
  const socket = useRecoilValue(usersocketStates);
  const currentUserName = useRecoilValue(userDataStates).name;
  const chatReceiver = useRecoilValue(chatWith);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (socket !== null) {
      socket.emit('send message', {
        sender: currentUserName,
        receiver: chatReceiver,
        message: value
      });

      socket.emit('send alarm', {
        sender: currentUserName,
        receiver: chatReceiver,
        type: 'chat',
        text: value
      });
    }
  };

  useEffect(() => {
    if (chatReceiver !== '' && socket !== null) {
      setMessageList([]);
      socket.emit('send chat initial', {
        sender: currentUserName,
        receiver: chatReceiver
      });

      socket.on('get previous chats', (filteredMsgs: string[]) => {
        setMessageList((messageList: string[]) => messageList.concat(filteredMsgs));
        socket.off('get previous chats');
        document.querySelector('.chat-list')?.scrollBy({
          top: document.querySelector('.chat-list')?.scrollHeight,
          behavior: 'smooth'
        });
      });

      socket.off('send chat initial');

      socket.off('receive message');
      socket.on('receive message', (data: ISocketMessage) => {
        const { sender, receiver, msg } = data;
        if (sender === currentUserName || (receiver === currentUserName && sender === chatReceiver)) {
          setMessageList((messageList: string[]) => messageList.concat(msg));
        }

        document.querySelector('.chat-list')?.scrollBy({
          top: document.querySelector('.chat-list')?.scrollHeight,
          behavior: 'smooth'
        });
      });
    }
  }, [chatReceiver, socket]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      submit(e);
      setValue('');
    }
  };

  return (
    <ChatSideBarContainer rightModalFlag={rightModalState.rightModalFlag} messageFlag={rightModalState.messageFlag}>
      <CurrentUserTitle />
      <CurrentUser />
      <Divider />
      <ChatTitle />
      <ChatListView messageList={messageList} />
      <form onSubmit={onSubmit}>
        <ChatInput value={value} setValue={setValue} />
      </form>
    </ChatSideBarContainer>
  );
};

export default ChatSideBar;

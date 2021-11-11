import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styled, { keyframes } from 'styled-components';

import { useRecoilValue } from 'recoil';
import { rightModalStates, userData, usersocket, chatWith } from 'recoil/store';

import CurrentUser from './CurrentUser';
import palette from 'theme/palette';
import { iconSubmit } from 'images/icons';

const Animation = keyframes`
  0% { opacity: 0; transform: translateX(100px); filter: blur(10px); }
  100% { opacity: 1; transform: translateX(0px); filter: blur(0px); }
`;

const ChatSideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
  height: inherit;

  animation-name: ${Animation};
  animation-duration: 0.75s;

  background-color: ${palette.white};
  box-shadow: -5px 2px 5px 0px rgb(0 0 0 / 24%);
`;

const ChatTitle = styled.div`
  text-align: center;
  font-size: 14px;
  color: ${palette.darkgray};

  margin-bottom: 10px;
`;

const ChatList = styled.section`
  flex: 1;
  text-align: right;
  width: 300px;
  height: 277px;
  bottom: 0;

  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 10px;

  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MessageWrap = styled.div<{ name: string; sender: string }>`
  ${(props) =>
    `text-align: ${props.name === props.sender ? 'right;' : 'left;'}`}
  width: inherit;
`;

const MessageText = styled.div<{ name: string; sender: string }>`
  display: inline-block;
  height: auto;
  border-radius: 10px;
  word-break: break-word;

  ${(props) => `color: ${props.name === props.sender ? 'white;' : 'black;'}`}
  ${(props) =>
    `background-color: ${
      props.name === props.sender
        ? `${palette.green};`
        : `${palette.lightgray};`
    }`}

  margin-top: 5px;
  padding-left: 10px;
  padding-right: 10px;
`;

const ChatInputWrapper = styled.div`
  align-items: center;
  text-align: center;

  margin-bottom: 16px;
`;

const ChatInput = styled.input`
  height: 30px;

  border: none;
  border-radius: 15px;

  background-color: rgb(240, 242, 245);
  padding-left: 8px;
`;

const SubmitBtn = styled.button`
  border: none;
  background-color: ${palette.white};
  transform: translateY(2px);
  margin-left: 16px;

  img {
    width: 16px;
    height: 16px;
  }
`;

const ChatSideBar = () => {
  const [messageList, setMessageList] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');

  const rightModalState = useRecoilValue(rightModalStates);
  const socket = useRecoilValue(usersocket);
  const userdata = useRecoilValue(userData);
  const chatReceiver = useRecoilValue(chatWith);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('send message', {
      sender: userdata.name,
      receiver: chatReceiver,
      message: value
    });
  };

  useEffect(() => {
    if (chatReceiver !== '') {
      setMessageList([]);
      socket.emit('send chat initial', {
        sender: userdata.name,
        receiver: chatReceiver
      });

      socket.on('get previous chats', (filteredMsgs: string[]) => {
        setMessageList((messageList: string[]) =>
          messageList.concat(filteredMsgs)
        );
        socket.off('get previous chats');
      });

      socket.off('send chat initial');

      socket.off('receive message');
      socket.on(
        'receive message',
        (data: { sender: string; receiver: string; msg: string }) => {
          const { sender, receiver, msg } = data;
          if (
            sender === userdata.name ||
            (receiver === userdata.name && sender === chatReceiver)
          ) {
            setMessageList((messageList: string[]) => messageList.concat(msg));
          }

          document.querySelector('.chat-list')?.scrollBy({
            top: document.querySelector('.chat-list')?.scrollHeight,
            behavior: 'smooth'
          });
        }
      );
    }
  }, [chatReceiver]);

  const chatList = messageList.map((msg, idx) => (
    <MessageWrap key={idx} name={msg.split(':')[0]} sender={userdata.name}>
      <MessageText name={msg.split(':')[0]} sender={userdata.name}>
        {msg}
      </MessageText>
    </MessageWrap>
  ));

  if (rightModalState.rightModalFlag && rightModalState.messageFlag) {
    return (
      <ChatSideBarContainer>
        <CurrentUser />
        <div>
          <hr />
        </div>
        <ChatTitle>
          {chatReceiver
            ? chatReceiver + ' 에게 보내는 편지'
            : '채팅할 상대 선택'}
        </ChatTitle>
        <ChatList className="chat-list">{chatList}</ChatList>
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            if (value) {
              submit(e);
              setValue('');
            } else {
              e.preventDefault();
            }
          }}
        >
          <ChatInputWrapper>
            <ChatInput
              type="text"
              autoComplete="off"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
              value={value}
              placeholder="Aa"
            />
            <SubmitBtn type="submit">
              <img src={iconSubmit} alt="submit-button-image" />
            </SubmitBtn>
          </ChatInputWrapper>
        </form>
      </ChatSideBarContainer>
    );
  } else return null;
};

export default ChatSideBar;

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { useRecoilValue } from 'recoil';
import {
  rightModalStates,
  userDataStates,
  usersocketStates,
  chatWith
} from 'recoil/store';

import CurrentUser from './CurrentUser';
import palette from 'theme/palette';
import style from 'theme/style';
import ProfilePhoto from 'components/common/ProfilePhoto';
import { iconSubmit, iconSubmitActive } from 'images/icons';
import { IMessage, ISocketMessage, ISuccessiveMessage } from 'types/message';

const ClickableProfileImage = styled(ProfilePhoto)``;

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
  display: flex;
  flex-direction: column;
  width: inherit;
  height: ${(props) =>
    props.rightModalFlag && props.messageFlag ? `inherit` : `0px`};

  visibility: ${(props) =>
    props.rightModalFlag && props.messageFlag ? `` : `hidden`};
  transition: ${(props) =>
    props.rightModalFlag && props.messageFlag ? `` : `all .5s`};

  animation-name: ${(props) =>
    props.rightModalFlag && props.messageFlag
      ? css`
          ${OpenChatAnimation}
        `
      : css`
          ${CloseChatAnimation}
        `};
  animation-duration: 0.5s;

  background-color: ${palette.white};
  box-shadow: -5px 2px 5px 0px rgb(0 0 0 / 24%);
`;

const CurrentUserTitle = styled.div<{
  rightModalFlag: boolean;
  messageFlag: boolean;
}>`
  text-align: center;
  font-size: ${style.font.small};
  color: ${palette.darkgray};

  margin-top: ${style.margin.small};
`;

const ChatTitle = styled.div<{
  rightModalFlag: boolean;
  messageFlag: boolean;
}>`
  text-align: center;
  font-size: ${style.font.small};
  color: ${palette.darkgray};

  margin-bottom: ${style.margin.normal};
`;

const ChatList = styled.section`
  flex: 1;
  width: 300px;
  height: 277px;
  bottom: 0;

  margin-right: ${style.margin.large};
  margin-left: ${style.margin.large};
  margin-bottom: ${style.margin.small};

  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MessageWrap = styled.div<IMessage>`
  ${(props) =>
    `text-align: ${
      props.currentUserName === props.sender ? 'right;' : 'left;'
    }`}
  width: inherit;
`;

const MessageText = styled.div<IMessage>`
  display: inline-block;
  height: auto;
  border-radius: 20px;
  word-break: break-word;
  text-align: left;
  max-width: 150px;

  ${(props) =>
    `color: ${props.currentUserName === props.sender ? 'white;' : 'black;'}`}
  ${(props) =>
    `background-color: ${
      props.currentUserName === props.sender
        ? `${palette.green};`
        : `${palette.lightgray};`
    }`}

  margin-top: ${style.margin.smallest};
  padding: ${style.padding.smallest} ${style.padding.normal}
    ${style.padding.smallest} ${style.padding.normal};
`;

const ChatInputWrapper = styled.div<{
  rightModalFlag: boolean;
  messageFlag: boolean;
}>`
  width: inherit;
  align-items: center;
  text-align: center;

  margin-top: ${style.margin.smallest};
  margin-bottom: ${style.margin.large};
`;

const ChatInput = styled.input`
  width: 250px;
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

const ReceiverDiv = styled.div<ISuccessiveMessage>`
  display: ${(props) =>
    props.receiver === props.sender || props.flag ? `none` : `flex`};
`;

const ReceiverName = styled.div`
  margin-left: ${style.margin.smallest};
`;

const Divider = styled.div`
  width: calc(100% - 32px);
  height: 1px;
  background: #dddddd;
  margin: ${style.margin.normal} ${style.margin.large} ${style.margin.normal}
    ${style.margin.large};
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
    }
  };

  useEffect(() => {
    if (chatReceiver !== '' && socket !== null) {
      setMessageList([]);
      //console.log(socket);
      socket.emit('send chat initial', {
        sender: currentUserName,
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
      socket.on('receive message', (data: ISocketMessage) => {
        const { sender, receiver, msg } = data;
        if (
          sender === currentUserName ||
          (receiver === currentUserName && sender === chatReceiver)
        ) {
          setMessageList((messageList: string[]) => messageList.concat(msg));
        }

        document.querySelector('.chat-list')?.scrollBy({
          top: document.querySelector('.chat-list')?.scrollHeight,
          behavior: 'smooth'
        });
      });
    }
  }, [chatReceiver, socket]);

  function ShowReceiverInfoFlag(idx: number, msg: string) {
    if (idx === 0) return msg.split(':')[0] === currentUserName ? true : false;
    else
      return msg.split(':')[0] === messageList[idx - 1].split(':')[0]
        ? true
        : false;
  }

  const chatList = messageList.map((msg, idx) => (
    <MessageWrap
      key={idx}
      currentUserName={currentUserName}
      sender={msg.split(':')[0]}
    >
      <ReceiverDiv
        receiver={msg.split(':')[0]}
        sender={currentUserName}
        flag={ShowReceiverInfoFlag(idx, msg)}
      >
        <ClickableProfileImage size={'30px'} />
        <ReceiverName>{msg.split(':')[0]}</ReceiverName>
      </ReceiverDiv>
      <MessageText currentUserName={currentUserName} sender={msg.split(':')[0]}>
        {msg.split(':')[1]}
      </MessageText>
    </MessageWrap>
  ));

  return (
    <ChatSideBarContainer
      rightModalFlag={rightModalState.rightModalFlag}
      messageFlag={rightModalState.messageFlag}
    >
      <CurrentUserTitle
        rightModalFlag={rightModalState.rightModalFlag}
        messageFlag={rightModalState.messageFlag}
      >
        전체 유저
      </CurrentUserTitle>
      <CurrentUser />
      <Divider />
      <ChatTitle
        rightModalFlag={rightModalState.rightModalFlag}
        messageFlag={rightModalState.messageFlag}
      >
        {chatReceiver ? chatReceiver + ' 에게 보내는 편지' : '채팅할 상대 선택'}
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
        <ChatInputWrapper
          rightModalFlag={rightModalState.rightModalFlag}
          messageFlag={rightModalState.messageFlag}
        >
          <ChatInput
            type="text"
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            value={value}
            placeholder="메시지 입력"
          />
          <SubmitBtn type="submit">
            <img
              src={iconSubmit}
              onMouseOver={(e) => (e.currentTarget.src = `${iconSubmitActive}`)}
              onMouseOut={(e) => (e.currentTarget.src = `${iconSubmit}`)}
              alt="submit-button-image"
            />
          </SubmitBtn>
        </ChatInputWrapper>
      </form>
    </ChatSideBarContainer>
  );
};

export default ChatSideBar;

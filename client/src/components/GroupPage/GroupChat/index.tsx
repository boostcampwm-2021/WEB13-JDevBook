import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';

import {
  GroupNavState,
  userDataStates,
  usersocketStates,
  loginState
} from 'recoil/store';

import style from 'theme/style';
import { ClickableProfilePhoto } from 'components/common';
import { iconSubmit, iconSubmitActive } from 'images/icons';
import { IMessage, ISuccessiveMessage } from 'types/message';

import useAlertModal from 'hooks/useAlertModal';

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

const CurrentUserTitle = styled.div`
  text-align: center;
  font-size: ${style.font.small};
  color: ${(props) => props.theme.darkgray};

  margin-top: ${style.margin.small};
`;

const ChatTitle = styled.div`
  text-align: center;
  font-size: ${style.font.small};
  color: ${(props) => props.theme.darkgray};

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

  color: ${(props) =>
    props.currentUserName === props.sender
      ? props.theme.white
      : props.theme.black};
  background-color: ${(props) =>
    props.currentUserName === props.sender
      ? props.theme.green
      : props.theme.lightgray};

  margin-top: ${style.margin.smallest};
  padding: ${style.padding.smallest} ${style.padding.normal};
`;

const ChatInputWrapper = styled.div`
  width: inherit;
  align-items: center;
  text-align: center;

  margin-top: ${style.margin.smallest};
  margin-bottom: ${style.margin.normal};
`;

const ChatInput = styled.textarea`
  width: 250px;
  height: 20px;
  padding: 5px 5px;

  border: none;
  border-radius: 15px;

  background-color: ${(props) => props.theme.lightgray};
  padding-left: 8px;

  overflow: hidden;
`;

const SubmitBtn = styled.button`
  border: none;
  background-color: ${(props) => props.theme.white};
  transform: translateY(2px);
  margin-left: 16px;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
    margin-bottom: 8px;
  }
`;

const ReceiverDiv = styled.div<ISuccessiveMessage>`
  display: ${(props) =>
    props.receiver === props.sender || props.flag ? `none` : `flex`};
  margin-top: ${style.margin.small};
`;

const ReceiverName = styled.div`
  margin-left: ${style.margin.small};
  line-height: 30px;
`;

const Divider = styled.div`
  width: calc(100% - 32px);
  height: 1px;
  background: #dddddd;
  margin: ${style.margin.normal} ${style.margin.large};
  box-shadow: 0 0 5px 0;
`;

const CurrentUserBox = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  border-radius: 10px;
`;

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

const LoginState = styled.div<{ user: string; loginStateArray: any }>`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  margin-right: ${style.margin.small};
  ${(props) =>
    `background-color: ${
      props.loginStateArray?.includes(props.user)
        ? props.theme.green
        : props.theme.darkgray
    };`}
`;

const GroupChat = ({ groupIdx }: { groupIdx: number }) => {
  const [groupNavState, setGroupNavState] = useRecoilState(GroupNavState);
  const [messageList, setMessageList] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const loginStateArray = useRecoilValue(loginState);

  const socket = useRecoilValue(usersocketStates);
  const currentUserName = useRecoilValue(userDataStates).name;
  const alertMessage = useAlertModal();

  const contentsBytesCheck = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const maxLength = 100;

    if (value.length > maxLength) {
      let valueCheck = value;
      alertMessage(`메시지는 ${maxLength}글자를 넘을 수 없습니다.`, true);
      while (valueCheck.length > maxLength) {
        valueCheck = valueCheck.slice(0, -1);
      }
      setValue(valueCheck);
    }
  };

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
      setMessageList((messageList: string[]) =>
        messageList.concat(filteredMsgs)
      );
      socket.off('get previous group chats');
      document.querySelector('.group-chat-list')?.scrollBy({
        top: document.querySelector('.group-chat-list')?.scrollHeight,
        behavior: 'smooth'
      });
    });

    socket.off('receive group message');
    socket.on(
      'receive group message',
      (data: { sender: string; groupidx: number; msg: string }) => {
        const { sender, groupidx, msg } = data;
        if (groupidx === groupIdx) {
          setMessageList((messageList: string[]) => messageList.concat(msg));
        }
        document.querySelector('.group-chat-list')?.scrollBy({
          top: document.querySelector('.group-chat-list')?.scrollHeight,
          behavior: 'smooth'
        });
      }
    );
  }, [socket, groupIdx]);

  useEffect(() => {
    return () => setGroupNavState({ ...groupNavState, groupChat: false });
  }, []);

  function ShowReceiverInfoFlag(idx: number, msg: string) {
    if (idx === 0) return msg.split(':')[0] === currentUserName ? true : false;
    else
      return msg.split(':')[0] === messageList[idx - 1].split(':')[0]
        ? true
        : false;
  }

  const UserList = allUsers.map((user: string, idx: number) => (
    <CurrentUserBox key={idx} className="User">
      <ClickableProfilePhoto userName={user} size={'30px'} />
      <LoginState user={user} loginStateArray={loginStateArray} />
      {user}
    </CurrentUserBox>
  ));

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
        <ClickableProfilePhoto userName={msg.split(':')[0]} size={'30px'} />
        <ReceiverName>{msg.split(':')[0]}</ReceiverName>
      </ReceiverDiv>
      <MessageText currentUserName={currentUserName} sender={msg.split(':')[0]}>
        {msg.split(':')[1]}
      </MessageText>
    </MessageWrap>
  ));

  return (
    <ChatSideBarContainer groupChatFlag={groupNavState.groupChat}>
      <CurrentUserTitle>이 그룹에 가입한 유저</CurrentUserTitle>
      <CurrentUserWrapper>{UserList}</CurrentUserWrapper>
      <Divider />
      <ChatTitle>{'모두 에게 보내는 편지'}</ChatTitle>
      <ChatList className="group-chat-list">{chatList}</ChatList>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          if (value) {
            submit(e);
            setValue('');
          }
          e.preventDefault();
        }}
      >
        <ChatInputWrapper>
          <ChatInput
            spellCheck="false"
            autoComplete="off"
            onKeyUp={contentsBytesCheck}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setValue(e.target.value)
            }
            onKeyPress={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                document.getElementById('submit-btn')?.click();
              }
            }}
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

export default GroupChat;

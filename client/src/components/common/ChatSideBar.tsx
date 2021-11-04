import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { rightModalStates, userData } from 'recoil/modal';
import socket from './Socket';
import { RightModalProps, Message } from 'utils/types';

const ChatSideBarContainer = styled.div<any>`
  width: inherit;
  height: inherit;
  ${(props) => `background: ${setColor(props.flagObj)}`}
`;

function setColor(props: RightModalProps) {
  if (props.rightModalFlag) {
    if (props.messageFlag) {
      return `yellow`;
    } else if (props.alarmFlag) {
      return `green`;
    } else if (props.selectorFlag) {
      return `blue`;
    }
  } else {
    return `white`;
  }
}

const ChatSideBar: React.FC = () => {
  const rightModalState = useRecoilValue(rightModalStates);

  const [messageList, setMessageList] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');
  const userdata = useRecoilValue(userData);
  // 테스트용. 나중에 클릭해서 상대방 이름 알도록 해야함
  let receiver: string = 'defaultfail';
  if (userdata.username === 'reservedgithubtest') receiver = 'kitaetest';
  else if (userdata.username === 'kitaetest') receiver = 'reservedgithubtest';

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // sernder, receiver, message 보내고
    // 서버에서 채팅 저장하고, 기존 메세지만 추가로 다시 받아
    socket.emit('send message', {
      sender: userdata.username,
      receiver: receiver,
      message: value
    });
  };

  useEffect(() => {
    // 지금은 이름인데 idx로 해줘!!!!!!!!!!!!!!!!!!!!!!! 그래야 DB에서 편해져
    // 처음에 이름 서버소켓에 등록해둬
    // 위에서 메세지 보낼때 내이름, 상대방이름(아이디), 채팅 보내
    // 서버에서 'send message'에서 자기 이름이 위 2개 이름중에 포함되면 진행
    // 뭘 진행? 채팅 보낸거 DB에 저장. 그리고 emit('receive message')로 아래 진행
    socket.on('receive message', (data: any) => {
      const { sender, receiver, msg } = data;
      if (sender === userdata.username || receiver === userdata.username)
        setMessageList((messageList: any) => messageList.concat(msg)); // 도저히 모르겠음
    });
  }, [userdata]);

  const chatList = messageList
    .map(
      (
        msg // 도대체 뭐지
      ) => (
        <div className="message">
          <p className="message-text">{msg}</p>
        </div>
      )
    )
    .reverse();

  return (
    <ChatSideBarContainer flagObj={rightModalState}>
      <div>
        <form
          className="chat-form"
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            if (value) {
              submit(e);
              setValue('');
            } else {
              e.preventDefault();
            }
          }}
        >
          <div className="chat-inputs">
            <input
              type="text"
              autoComplete="off"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
              value={value}
              placeholder="메세지입력하기"
            />
          </div>
          <button type="submit">입력하기</button>
        </form>
        <section className="chat-list">{chatList}</section>
      </div>
    </ChatSideBarContainer>
  );
};

export default ChatSideBar;

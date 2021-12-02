import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { userDataStates } from 'recoil/user';

import { IMessage, ISuccessiveMessage } from 'types/message';
import style from 'theme/style';

import { ClickableProfilePhoto } from 'components/common';

const MessageWrap = styled.div<IMessage>`
  ${(props) => `text-align: ${props.currentUserName === props.sender ? 'right;' : 'left;'}`}
  width: inherit;
`;

const ReceiverDiv = styled.div<ISuccessiveMessage>`
  display: ${(props) => (props.receiver === props.sender || props.flag ? `none` : `flex`)};
  margin-top: ${style.margin.small};
`;

const ReceiverName = styled.div`
  margin-left: ${style.margin.small};
  line-height: 30px;
`;

const MessageText = styled.div<IMessage>`
  display: inline-block;
  height: auto;
  border-radius: 20px;
  word-break: break-word;
  text-align: left;
  max-width: 150px;

  color: ${(props) => (props.currentUserName === props.sender ? props.theme.white : props.theme.black)};
  background-color: ${(props) => (props.currentUserName === props.sender ? props.theme.green : props.theme.lightgray)};

  margin-top: ${style.margin.smallest};
  padding: ${style.padding.smallest} ${style.padding.normal};
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

const ChatListView = ({ messageList }: { messageList: string[] }) => {
  const currentUserName = useRecoilValue(userDataStates).name;

  function ShowReceiverInfoFlag(idx: number, msg: string) {
    if (idx === 0) return msg.split(':')[0] === currentUserName ? true : false;
    else return msg.split(':')[0] === messageList[idx - 1].split(':')[0] ? true : false;
  }
  const chatList = messageList.map((msg, idx) => (
    <MessageWrap key={idx} currentUserName={currentUserName} sender={msg.split(':')[0]}>
      <ReceiverDiv receiver={msg.split(':')[0]} sender={currentUserName} flag={ShowReceiverInfoFlag(idx, msg)}>
        <ClickableProfilePhoto userName={msg.split(':')[0]} size={'30px'} />
        <ReceiverName>{msg.split(':')[0]}</ReceiverName>
      </ReceiverDiv>
      <MessageText currentUserName={currentUserName} sender={msg.split(':')[0]}>
        {msg.substring(msg.indexOf(':') + 1, msg.length)}
      </MessageText>
    </MessageWrap>
  ));

  return <ChatList className="group-chat-list">{chatList}</ChatList>;
};

export default ChatListView;

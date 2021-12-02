import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { chatWith } from 'recoil/socket';
import { rightModalStates } from 'recoil/common';

import style from 'theme/style';

const ChatTitleContainer = styled.div<{
  rightModalFlag: boolean;
  messageFlag: boolean;
}>`
  text-align: center;
  font-size: ${style.font.small};
  color: ${(props) => props.theme.darkgray};

  margin-bottom: ${style.margin.normal};
`;

const ChatTitle = () => {
  const rightModalState = useRecoilValue(rightModalStates);
  const chatReceiver = useRecoilValue(chatWith);

  return (
    <ChatTitleContainer rightModalFlag={rightModalState.rightModalFlag} messageFlag={rightModalState.messageFlag}>
      {chatReceiver ? chatReceiver + ' 에게 보내는 편지' : '채팅할 상대 선택'}
    </ChatTitleContainer>
  );
};
export default ChatTitle;

import styled from 'styled-components';

import style from 'theme/style';

const ChatTitleContainer = styled.div`
  text-align: center;
  font-size: ${style.font.small};
  color: ${(props) => props.theme.darkgray};

  margin-bottom: ${style.margin.normal};
`;

const ChatTitle = () => {
  return <ChatTitleContainer>모두 에게 보내는 편지</ChatTitleContainer>;
};

export default ChatTitle;

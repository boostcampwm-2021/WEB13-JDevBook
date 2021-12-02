import { Dispatch } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { rightModalStates } from 'recoil/common';

import style from 'theme/style';
import useAlertModal from 'hooks/useAlertModal';

import SubmitBtn from 'components/common/ChatSideBar/SubmitBtn';

const ChatInputWrapper = styled.div<{
  rightModalFlag: boolean;
  messageFlag: boolean;
}>`
  width: inherit;
  align-items: center;
  text-align: center;

  margin-top: ${style.margin.smallest};
  margin-bottom: ${style.margin.normal};
`;

const ChatInputBox = styled.textarea`
  width: 250px;
  height: 20px;
  padding: 5px 5px;

  border: none;
  border-radius: 15px;

  color: ${(props) => props.theme.black};
  background-color: ${(props) => props.theme.lightgray};
  padding-left: 8px;

  resize: none;
  overflow: hidden;
`;

const ChatInput = ({ value, setValue }: { value: string; setValue: Dispatch<string> }) => {
  const alertMessage = useAlertModal();
  const rightModalState = useRecoilValue(rightModalStates);

  const contentsBytesCheck = () => {
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

  return (
    <ChatInputWrapper rightModalFlag={rightModalState.rightModalFlag} messageFlag={rightModalState.messageFlag}>
      <ChatInputBox
        spellCheck="false"
        autoComplete="off"
        onKeyUp={contentsBytesCheck}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
        onKeyPress={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            document.getElementById('submit-btn')?.click();
          }
        }}
        value={value}
        placeholder="메시지 입력"
      />
      <SubmitBtn />
    </ChatInputWrapper>
  );
};

export default ChatInput;

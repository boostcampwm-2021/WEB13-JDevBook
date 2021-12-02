import { ChangeEvent, Dispatch } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { userDataStates } from 'recoil/user';

import style from 'theme/style';
import useAlertModal from 'hooks/useAlertModal';

import { ClickableProfilePhoto } from 'components/common';

const CommentInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CommentInput = styled.input`
  width: 622px;
  height: 35px;
  border: none;
  border-radius: 15px;

  background-color: ${(props) => props.theme.lightgray};
  margin-left: ${style.margin.normal};
  padding-left: ${style.padding.normal};
  color: ${(props) => props.theme.black};
`;

const CommentInputBox = ({ value, setValue }: { value: string; setValue: Dispatch<string> }) => {
  const currentUserName = useRecoilValue(userDataStates).name;

  const alertMessage = useAlertModal();
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
    <CommentInputWrapper>
      <ClickableProfilePhoto userName={currentUserName} size={'30px'} />
      <CommentInput
        type="text"
        autoComplete="off"
        onKeyUp={contentsBytesCheck}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        value={value}
        placeholder="댓글을 입력하세요..."
      />
    </CommentInputWrapper>
  );
};

export default CommentInputBox;

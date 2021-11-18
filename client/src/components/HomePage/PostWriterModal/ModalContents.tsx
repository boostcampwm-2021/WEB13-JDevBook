import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';

import {
  modalStateStore,
  userDataStates,
  postModalDataStates
} from 'recoil/store';
import palette from 'theme/palette';
import style from 'theme/style';
import textUtil from 'utils/textUtil';

import useAlertModal from 'hooks/useAlertModal';

const ModalContentsContainer = styled.div`
  width: 100%;
  height: 300px;
  margin: 16px 0;

  display: flex;
  flex-direction: column;
`;

const ContentsInput = styled.textarea<{ modalState: boolean }>`
  height: ${(props) => (props.modalState ? '21%' : '95%')};

  border: none;
  outline: none;
  resize: none;
  background-color: ${palette.white};
  font-size: ${style.font.normal};

  overscroll-behavior: none;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #bfbfbf;
  }
  :-ms-input-placeholder {
    color: #bfbfbf;
  }
`;

const ContentsBytesChecker = styled.div`
  margin-top: 4px;
  padding-right: 20px;

  display: flex;
  justify-content: flex-end;

  color: ${palette.darkgray};
`;

const ModalContents = () => {
  const modalState = useRecoilValue(modalStateStore);
  const userdata = useRecoilValue(userDataStates);
  const [postData, setPostData] = useRecoilState(postModalDataStates);
  const [contentsLength, setcontentsLength] = useState<number>(0);
  const alertMessage = useAlertModal();

  const inputContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostData({ ...postData, contents: e.target.value });
  };

  const contentsBytesCheck = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const maxLength = 340;

    if (contentsLength > maxLength) {
      let contents = postData.contents;
      alertMessage(
        `게시글은 ${maxLength}글자를 넘을 수 없습니다.`,
        `${palette.alert}`
      );
      while (contents.length > maxLength) {
        contents = contents.slice(0, -1);
      }
      setPostData({ ...postData, contents: contents });
    }
  };

  useEffect(() => {
    setcontentsLength(postData.contents.length);
  }, [postData.contents]);

  return (
    <ModalContentsContainer>
      <ContentsInput
        placeholder={`${userdata.name}님, 무슨 생각을 하고 계신가요?`}
        modalState={modalState.post.inPhoto}
        onChange={inputContents}
        onKeyUp={contentsBytesCheck}
        value={postData.contents}
      />
      <ContentsBytesChecker>{contentsLength} / 340 글자</ContentsBytesChecker>
    </ModalContentsContainer>
  );
};

export default ModalContents;

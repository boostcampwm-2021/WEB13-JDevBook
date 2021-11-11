import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';

import { modalVisibleStates, userData, postWriterData } from 'recoil/store';
import palette from 'theme/palette';
import textUtil from 'utils/textUtil';

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
  font-family: 'Spoqa Han Sans Neo';
  font-size: 18px;

  overscroll-behavior: none;
`;

const ContentsBytesChecker = styled.div`
  margin-top: 4px;
  padding-right: 20px;

  display: flex;
  justify-content: flex-end;

  color: ${palette.darkgray};
`;

const ModalContents = () => {
  const modalState = useRecoilValue(modalVisibleStates);
  const userdata = useRecoilValue(userData);
  const [postData, setPostData] = useRecoilState(postWriterData);
  const [contentsBytes, setContentsBytes] = useState<number>(0);

  const inputContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostData({ ...postData, contents: e.target.value });
  };

  const contentsBytesCheck = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const maxBytes = 1000;

    if (contentsBytes > maxBytes) {
      let contents = postData.contents;
      alert(`게시글은 ${maxBytes}bytes를 넘을 수 없습니다.`);
      while (textUtil.getByteLength(contents) > maxBytes) {
        contents = contents.slice(0, -1);
      }
      setPostData({ ...postData, contents: contents });
    }
  };

  useEffect(() => {
    setContentsBytes(textUtil.getByteLength(postData.contents));
  }, [postData.contents]);

  return (
    <ModalContentsContainer>
      <ContentsInput
        placeholder={`${userdata.name}님, 무슨 생각을 하고 계신가요?`}
        modalState={modalState.postInPhoto}
        onChange={inputContents}
        onKeyUp={contentsBytesCheck}
        value={postData.contents}
      />
      <ContentsBytesChecker>{contentsBytes} / 1000 bytes</ContentsBytesChecker>
    </ModalContentsContainer>
  );
};

export default ModalContents;

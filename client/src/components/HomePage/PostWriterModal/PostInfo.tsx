import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';

import { userDataStates } from 'recoil/user';
import { postModalDataStates } from 'recoil/post';

import style from 'theme/style';

import { ProfilePhoto } from 'components/common';

const PostInfoWrap = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  color: ${(props) => props.theme.black};

  div {
    margin: 0 12px;
    font-size: 16px;
    font-weight: bold;
  }
`;

const SecretSelector = styled.div<{ isSecret: boolean }>`
  width: 100px;
  height: 30px;
  padding: 0 ${style.padding.small};

  background-color: ${(props) => (props.isSecret ? props.theme.green : props.theme.lightgray)};
  color: ${(props) => (props.isSecret ? props.theme.inColorBox : props.theme.black)};
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => (props.isSecret ? props.theme.darkgreen : props.theme.gray)};
  }

  &:active {
    background-color: ${(props) => props.theme.darkgray};
    font-size: 15px;
  }
`;

const PostInfo = () => {
  const userdata = useRecoilValue(userDataStates);
  const [postData, setPostData] = useRecoilState(postModalDataStates);
  const [secretStr, setSecretStr] = useState('');

  const secretToggleHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setPostData({ ...postData, secret: !postData.secret });
  };

  useEffect(() => {
    postData.secret ? setSecretStr(' 🔒 나만 보기') : setSecretStr(' 👨‍👨‍👧‍👧 전체 공개');
  }, [postData.secret]);

  return (
    <PostInfoWrap>
      <ProfilePhoto userName={userdata.name} size="44px" />
      <div>{userdata.name}</div>
      <SecretSelector isSecret={postData.secret} onClick={secretToggleHandler}>
        {secretStr}
      </SecretSelector>
    </PostInfoWrap>
  );
};

export default PostInfo;

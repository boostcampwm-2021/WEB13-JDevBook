import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';

import { userData, postWriterData } from 'recoil/store';
import palette from 'theme/palette';

import { ProfilePhoto } from 'components/common';

const PostInfoWrap = styled.div`
  width: 100%;

  display: flex;
  align-items: center;

  div {
    margin: 0 12px;
    font-size: 16px;
    font-weight: bold;
  }
`;

const SecretSelector = styled.div`
  width: 112px;
  height: 30px;

  background-color: ${palette.lightgray};
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const PostInfo = () => {
  const userdata = useRecoilValue(userData);
  const [postData, setPostData] = useRecoilState(postWriterData);
  const [secretStr, setSecretStr] = useState('');

  const secretToggleHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setPostData({ ...postData, secret: !postData.secret });
  };

  useEffect(() => {
    postData.secret
      ? setSecretStr('🔒 나만 보기')
      : setSecretStr('👨‍👩‍👧‍👧 전체 공개');
  }, [postData.secret]);

  return (
    <PostInfoWrap>
      <ProfilePhoto src="" size="44px" />
      <div>{userdata.name}</div>
      <SecretSelector onClick={secretToggleHandler}>{secretStr}</SecretSelector>
    </PostInfoWrap>
  );
};

export default PostInfo;

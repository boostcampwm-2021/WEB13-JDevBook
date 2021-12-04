import React from 'react';
import styled from 'styled-components';

import { IconPublic, IconPrivate } from 'images/icons';
import { PostHeaderProps } from 'types/post';
import textUtil from 'utils/textUtil';

import { ClickableProfilePhoto } from 'components/common';

const HeaderContainer = styled.div`
  width: 100%;
  box-sizing: inherit;
  padding: 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.black};
`;

const HeaderContent = styled.div`
  flex: 1;
  margin-left: 12px;

  & > div {
    display: flex;
    align-items: center;
    margin-top: 2px;
    font-size: 0.8rem;
    color: #888888;

    path {
      fill: #555555;
    }

    p {
      margin-right: 2px;
    }
  }
`;

const Header = ({ nickname, profile, createdAt, secret }: PostHeaderProps) => {
  return (
    <HeaderContainer className="no-drag">
      <ClickableProfilePhoto userName={nickname} size={'44px'} />
      <HeaderContent>
        <p>{nickname}</p>
        <div>
          <p>{textUtil.timeToString(createdAt)}</p>
          <p>·</p>
          {secret ? <IconPrivate /> : <IconPublic />}
        </div>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;

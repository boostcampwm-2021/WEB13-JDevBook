import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { likeBadge } from 'images/icons';
import { PostFooterProps } from 'utils/types';

import { useRecoilState } from 'recoil';
import { CommentState } from 'recoil/store';

const FooterContainer = styled.div`
  width: 100%;
  box-sizing: inherit;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;

    img {
      width: 18px;
      height: 18px;
      margin-right: 4px;
    }
  }

  p {
    font-size: 0.95rem;
    color: #999999;
  }
`;

const Comments = styled.p`
  cursor: pointer;
  font-size: 0.95rem;
  color: #999999;
`;

const Footer = ({ likenum, commentFlag, setCommentFlag }: PostFooterProps) => {
  return (
    <FooterContainer>
      <div>
        <img src={likeBadge} alt="likeBadge" />
        <p>{likenum.toString()}</p>
      </div>
      {/* <p>777 Comments</p> */}
      <Comments
        onClick={() =>
          commentFlag ? setCommentFlag(false) : setCommentFlag(true)
        }
      >
        777 Comments
      </Comments>
    </FooterContainer>
  );
};

export default Footer;

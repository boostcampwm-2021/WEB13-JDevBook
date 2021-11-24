import React from 'react';
import styled, { css } from 'styled-components';

import { likeBadge } from 'images/icons';
import { PostFooterProps } from 'types/post';

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
      margin-right: 6px;
      margin-top: 2px;
    }
  }

  p {
    color: #999999;
  }
`;

const Comments = styled.div`
  cursor: pointer;
  font-size: 0.95rem;
  color: #999999;
`;

const CommentsNum = styled.div``;

const Footer = ({
  likenum,
  commentFlag,
  setCommentFlag,
  postIdx,
  commentsNum,
  setCommentsNum
}: PostFooterProps) => {
  return (
    <FooterContainer className="no-drag">
      <div>
        <img src={likeBadge} alt="likeBadge" />
        <p>{likenum.toString()}</p>
      </div>
      {commentsNum ? (
        <Comments onClick={() => setCommentFlag(!commentFlag)}>
          <CommentsNum onClick={() => setCommentFlag(!commentFlag)}>
            댓글 {commentsNum} 개
          </CommentsNum>
        </Comments>
      ) : null}
    </FooterContainer>
  );
};

export default Footer;

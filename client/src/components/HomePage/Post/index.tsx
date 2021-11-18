import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdMoreHoriz } from 'react-icons/md';

import { LikeIcon, LikeIconActive, CommentIcon } from 'images/icons';
import { PostData } from 'types/post';

import palette from 'theme/palette';
import style from 'theme/style';

import { useRecoilState, useRecoilValue } from 'recoil';
import { modalStateStore, userDataStates } from 'recoil/store';
import Header from './Header';
import OptionModal from './OptionModal';
import Body from './Body';
import Footer from './Footer';
import fetchApi from 'api/fetch';
import Comment from './Comment';

const PostContainer = styled.div`
  width: 680px;
  min-width: 680px;
  position: relative;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;
  margin-top: 24px;
  background-color: ${palette.white};

  p {
    margin: 0;
  }
`;

const ButtonsWrap = styled.div`
  width: calc(100% - 24px);
  box-sizing: inherit;
  margin: 4px 12px 0px;
  display: flex;
  align-items: center;
`;

const Button = styled.div<{ isLike?: boolean }>`
  flex: 1;
  margin: 0px 2px 4px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.1s ease-in-out;

  p {
    margin-left: 8px;
    color: ${(props) =>
      props.isLike ? `${palette.darkgreen}` : `${palette.darkgray}`};
  }

  svg {
    width: 18px;
    height: 18px;
  }

  path {
    fill: ${(props) =>
      props.isLike ? `${palette.darkgreen}` : `${palette.darkgray}`};
  }

  &:hover {
    cursor: pointer;
    background: ${palette.lightgray};
    border-radius: 4px;
  }
  &:active {
    background-color: ${palette.gray};
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const IconHover = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    background-color: ${palette.lightgray};
  }

  &:active {
    background-color: ${palette.gray};
  }

  svg {
    font-size: 24px;
  }
`;

const Divider = styled.div`
  width: calc(100% - 32px);
  height: 1px;
  background: #dddddd;
  margin-left: 16px;
  margin-right: 16px;
`;

const Post = ({ post }: { post: PostData }) => {
  const [modalState, setModalState] = useRecoilState(modalStateStore);
  const { idx: myIdx } = useRecoilValue(userDataStates);
  const [likeFlag, setLikeFlag] = useState<boolean>(false);
  const [likeNum, setLikeNum] = useState<number>(0);
  const [commentFlag, setCommentFlag] = useState<boolean>(false);

  const {
    idx: postIdx,
    secret,
    createdAt,
    contents,
    picture1,
    picture2,
    picture3,
    BTUseruseridx
  } = post;
  const { idx: postUserIdx, nickname, profile } = BTUseruseridx;

  const likeToggle = async (e: React.MouseEvent<HTMLDivElement>) => {
    likeFlag
      ? fetchApi.updateLikeNum(postIdx, likeNum - 1)
      : fetchApi.updateLikeNum(postIdx, likeNum + 1);

    likeFlag ? setLikeNum(likeNum - 1) : setLikeNum(likeNum + 1);
    setLikeFlag(!likeFlag);
    await fetchApi.addLikePost(myIdx, postIdx);
  };

  useEffect(() => {
    post.likeFlag ? setLikeFlag(true) : setLikeFlag(false);
    setLikeNum(post.likenum);
  }, []);

  return (
    <PostContainer>
      {postUserIdx === myIdx && (
        <IconHover
          onClick={() =>
            setModalState({
              ...modalState,
              post: { ...modalState.post, index: postIdx }
            })
          }
        >
          <MdMoreHoriz />
        </IconHover>
      )}
      {modalState.post.index === postIdx && <OptionModal post={post} />}
      <Header
        nickname={nickname}
        profile={profile}
        createdAt={createdAt}
        secret={secret}
      />
      <Body
        contents={contents}
        picture1={picture1}
        picture2={picture2}
        picture3={picture3}
      />
      <Footer
        likenum={likeNum}
        commentFlag={commentFlag}
        setCommentFlag={setCommentFlag}
      />
      <Divider />
      <ButtonsWrap>
        <Button isLike={likeFlag} onClick={likeToggle}>
          <LikeIcon />
          <p>좋아요</p>
        </Button>
        <Button
          onClick={() =>
            commentFlag ? setCommentFlag(false) : setCommentFlag(true)
          }
        >
          <CommentIcon />
          <p>댓글 달기</p>
        </Button>
      </ButtonsWrap>
      <Divider />
      {commentFlag && <Comment postIdx={postIdx} />}
    </PostContainer>
  );
};

export default Post;

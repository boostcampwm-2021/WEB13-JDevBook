import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdMoreHoriz } from 'react-icons/md';
import { useRecoilValue } from 'recoil';

import { usersocketStates } from 'recoil/socket';
import { userDataStates } from 'recoil/user';

import { LikeIcon, CommentIcon } from 'images/icons';
import { PostData } from 'types/post';

import Header from 'components/HomePage/Post/Header';
import OptionModal from 'components/HomePage/Post/OptionModal';
import Body from 'components/HomePage/Post/Body';
import Footer from 'components/HomePage/Post/Footer';
import fetchApi from 'api/fetch';
import Comment from 'components/HomePage/Post/Comment';

const PostContainer = styled.div`
  width: 100%;
  position: relative;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;
  margin-top: 24px;
  background-color: ${(props) => props.theme.white};

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
    color: ${(props) => (props.isLike ? props.theme.darkgreen : props.theme.darkgray)};
  }

  svg {
    width: 18px;
    height: 18px;
  }

  path {
    fill: ${(props) => (props.isLike ? props.theme.darkgreen : props.theme.darkgray)};
  }

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.lightgray};
    border-radius: 4px;
  }
  &:active {
    background-color: ${(props) => props.theme.gray};
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
    background-color: ${(props) => props.theme.lightgray};
  }

  &:active {
    background-color: ${(props) => props.theme.gray};
  }

  svg {
    font-size: 24px;
    color: ${(props) => props.theme.black};
  }
`;

const Divider = styled.div`
  width: calc(100% - 32px);
  height: 1px;
  background: #dddddd;
  margin-left: 16px;
  margin-right: 16px;
`;

const Post = ({ post, isProfile = false }: { post: PostData; isProfile?: boolean }) => {
  const { idx: myIdx } = useRecoilValue(userDataStates);
  const [likeFlag, setLikeFlag] = useState<boolean>(false);
  const [likeNum, setLikeNum] = useState<number>(0);
  const [commentFlag, setCommentFlag] = useState<boolean>(false);
  const [commentsNum, setCommentsNum] = useState<number>(post.commentnum);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const socket = useRecoilValue(usersocketStates);

  const { idx: postIdx, secret, createdAt, contents, picture1, picture2, picture3, BTUseruseridx } = post;
  const { idx: postUserIdx, nickname, profile } = BTUseruseridx;

  const likeToggle = async (e: React.MouseEvent<HTMLDivElement>) => {
    likeFlag ? fetchApi.updateLikeNum(postIdx, likeNum - 1) : fetchApi.updateLikeNum(postIdx, likeNum + 1);

    likeFlag ? setLikeNum(likeNum - 1) : setLikeNum(likeNum + 1);
    setLikeFlag(!likeFlag);
    await fetchApi.addLikePost(myIdx, postIdx);
  };

  useEffect(() => {
    post.likeFlag ? setLikeFlag(true) : setLikeFlag(false);
    setLikeNum(post.likenum);
  }, []);

  useEffect(() => {
    socket.emit('send number of comments notify', { postidx: postIdx });
  }, [commentsNum]);
  socket.on('get number of comments', (data: { postidx: number; commentsNum: number }) => {
    const { postidx, commentsNum } = data;
    if (postIdx === postidx) {
      setCommentsNum(commentsNum);
    }
  });

  return (
    <PostContainer>
      {postUserIdx === myIdx && (
        <IconHover onClick={() => setModalOpen(true)}>
          <MdMoreHoriz />
        </IconHover>
      )}
      {isModalOpen && <OptionModal post={post} setModalOpen={setModalOpen} />}
      <Header nickname={nickname} profile={profile} createdAt={createdAt} secret={secret} />
      <Body postBody={{ contents, picture1, picture2, picture3 }} isProfile={isProfile} />
      <Footer
        likenum={likeNum}
        commentFlag={commentFlag}
        setCommentFlag={setCommentFlag}
        postIdx={postIdx}
        commentsNum={commentsNum}
        setCommentsNum={setCommentsNum}
      />
      <Divider />
      <ButtonsWrap className="no-drag">
        <Button isLike={likeFlag} onClick={likeToggle}>
          <LikeIcon />
          <p>좋아요</p>
        </Button>
        <Button onClick={() => (commentFlag ? setCommentFlag(false) : setCommentFlag(true))}>
          <CommentIcon />
          <p>댓글 달기</p>
        </Button>
      </ButtonsWrap>
      {commentFlag && (
        <>
          <Divider />
          <Comment postIdx={postIdx} setCommentsNum={setCommentsNum} nickname={nickname} />
        </>
      )}
    </PostContainer>
  );
};

export default Post;

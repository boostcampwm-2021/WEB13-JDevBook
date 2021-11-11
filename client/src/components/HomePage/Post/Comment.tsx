import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styled, { keyframes } from 'styled-components';

import { ProfilePhoto } from 'components/common';
import palette from 'theme/palette';
import { useRecoilValue } from 'recoil';
import { userData, usersocket } from 'recoil/store';

const Animation = keyframes`
  0% { opacity: 0; filter: blur(10px); }
  100% { opacity: 1; filter: blur(0px); }
`;

const CommentsWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;

  animation-name: ${Animation};
  animation-duration: 0.5s;
`;

const ClickableProfileImage = styled(ProfilePhoto)``;

const CommentBox = styled.div`
  display: inline-block;
  border-radius: 15px;
  background-color: ${palette.lightgray};
  margin-left: 10px;
`;

const CommentContent = styled.div`
  margin: 5px;
  word-break: break-word;
`;

const CommentTitle = styled.div``;
const CommentText = styled.div`
  font-weight: normal;
`;

const CommentInputWrap = styled.div`
  animation-name: ${Animation};
  animation-duration: 0.5s;
  padding: 10px;
`;
const CommentInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CommentInput = styled.input`
  width: 600px;
  height: 35px;
  border: none;
  border-radius: 15px;

  background-color: ${palette.lightgray};
  margin-left: 10px;
  padding-left: 10px;
`;

interface IComment {
  writer: string;
  text: string;
}

const Comment = ({ postIdx }: { postIdx: number }) => {
  const [value, setValue] = useState<string>('');
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const socket = useRecoilValue(usersocket);
  const userdata = useRecoilValue(userData);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('add comment', {
      sender: userdata.name,
      postidx: postIdx,
      comments: value
    });
  };

  useEffect(() => {
    setCommentList([]);
    socket.emit('send comments initial', {
      postidx: postIdx
    });

    socket.on('get previous comments', (comment: IComment[]) => {
      setCommentList((commentList: IComment[]) => commentList.concat(comment));
      socket.off('get previous comments');
    });
  }, [postIdx]);

  useEffect(() => {
    socket.off('receive comment');
    socket.on(
      'receive comment',
      (data: { sender: string; postidx: number; comments: string }) => {
        const { sender, postidx, comments } = data;
        setCommentList((commentList: IComment[]) =>
          commentList.concat({ writer: sender, text: comments })
        );
      }
    );
  }, [commentList]);

  const comments = commentList.map((comment: IComment, idx: number) => (
    <CommentsWrap key={idx}>
      <ClickableProfileImage size={'30px'} />
      <CommentBox>
        <CommentContent>
          <CommentTitle>{comment.writer}</CommentTitle>
          <CommentText>{comment.text}</CommentText>
        </CommentContent>
      </CommentBox>
    </CommentsWrap>
  ));

  return (
    <>
      {comments}
      <CommentInputWrap>
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            if (value) {
              submit(e);
              setValue('');
            } else {
              e.preventDefault();
            }
          }}
        >
          <CommentInputWrapper>
            <ClickableProfileImage size={'30px'} />
            <CommentInput
              type="text"
              autoComplete="off"
              onFocus={(e: any) => {
                setCommentList((commentList: IComment[]) =>
                  commentList.concat()
                );
              }}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
              value={value}
              placeholder="댓글을 입력하세요..."
            />
          </CommentInputWrapper>
        </form>
      </CommentInputWrap>
    </>
  );
};

export default Comment;

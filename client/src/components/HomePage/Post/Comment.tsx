import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { userDataStates, usersocketStates } from 'recoil/store';
import { ProfilePhoto } from 'components/common';
import palette from 'theme/palette';
import style from 'theme/style';
import { IComment } from 'types/comment';

import fetchApi from 'api/fetch';

const Animation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const CommentsWrap = styled.div`
  display: flex;
  align-items: center;
  padding: ${style.padding.small} ${style.padding.small} 0 ${style.padding.small};

  animation-name: ${Animation};
  animation-duration: 0.5s;
`;

const ClickableProfileImage = styled(ProfilePhoto)``;

const CommentBox = styled.div`
  display: inline-block;
  border-radius: 15px;
  background-color: ${palette.lightgray};
  margin-left: ${style.margin.normal};
  padding-left: ${style.padding.small};
  padding-right: ${style.padding.small};
`;

const CommentContent = styled.div`
  margin: ${style.margin.smallest};
  word-break: break-word;
`;

const CommentTitle = styled.div``;
const CommentText = styled.div`
  font-weight: normal;
`;

const CommentInputWrap = styled.div`
  animation-name: ${Animation};
  animation-duration: 0.5s;
  padding: ${style.padding.small};
`;
const CommentInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CommentInput = styled.input`
  width: 622px;
  height: 35px;
  border: none;
  border-radius: 15px;

  background-color: ${palette.lightgray};
  margin-left: ${style.margin.normal};
  padding-left: ${style.padding.normal};
`;

const Comment = ({ postIdx }: { postIdx: number }) => {
  const [value, setValue] = useState<string>('');
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const currentUserName = useRecoilValue(userDataStates).name;

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const addCommentRes = await fetchApi.addComments({
      sender: currentUserName,
      postidx: postIdx,
      comments: value
    });
    
    if (addCommentRes.check) {
      setCommentList((commentList: IComment[]) =>
        commentList.concat(
          Object.assign({
            writer: currentUserName,
            text: addCommentRes.result.comments
          })
        )
      );
    }
  };

  useEffect(() => {
    setCommentList([]);
    const getPrevComments = async () => {
      const prevComments = await fetchApi.getComments(postIdx);
      const prevCommentsArray: IComment[] = prevComments.map((data: any) =>
        Object.assign({
          writer: data.BTUseruseridx.nickname,
          text: data.comments
        })
      );
      setCommentList((commentList: IComment[]) =>
        commentList.concat(prevCommentsArray)
      );
    };

    getPrevComments();
  }, []);

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

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { userDataStates, usersocketStates } from 'recoil/store';
import { ClickableProfilePhoto } from 'components/common';
import style from 'theme/style';
import { IComment } from 'types/comment';
import textUtil from 'utils/textUtil';

import fetchApi from 'api/fetch';

import useAlertModal from 'hooks/useAlertModal';

const Animation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const CommentsWrap = styled.div`
  display: flex;
  align-items: center;
  padding: ${style.padding.small} ${style.padding.small} 0
    ${style.padding.small};

  animation-name: ${Animation};
  animation-duration: 0.5s;
  color: ${(props) => props.theme.black};
`;

const CommentBox = styled.div`
  display: inline-block;
  border-radius: 15px;
  background-color: ${(props) => props.theme.lightgray};
  margin-left: ${style.margin.normal};
  padding-left: ${style.padding.small};
  padding-right: ${style.padding.small};
`;

const CommentContent = styled.div`
  margin: ${style.margin.smallest};
  word-break: break-word;
`;

const CommentTitle = styled.div`
  display:flex;
`;

const CommentDate = styled.div`
  margin-left: 6px;
  padding-top: 2.5px;
  font-size: ${style.font.small};
  opacity: 0.5;
`;

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

  background-color: ${(props) => props.theme.lightgray};
  margin-left: ${style.margin.normal};
  padding-left: ${style.padding.normal};
  color: ${(props) => props.theme.black};
`;

const Comment = ({
  postIdx,
  commentsNum,
  setCommentsNum,
  nickname
}: {
  postIdx: number;
  commentsNum: number;
  setCommentsNum: React.Dispatch<number>;
  nickname: string;
}) => {
  const [value, setValue] = useState<string>('');
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const currentUserName = useRecoilValue(userDataStates).name;
  const socket = useRecoilValue(usersocketStates);
  const alertMessage = useAlertModal();

  const contentsBytesCheck = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const maxLength = 100;

    if (value.length > maxLength) {
      let valueCheck = value;
      alertMessage(`메시지는 ${maxLength}글자를 넘을 수 없습니다.`, true);
      while (valueCheck.length > maxLength) {
        valueCheck = valueCheck.slice(0, -1);
      }
      setValue(valueCheck);
    }
  };

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
            text: addCommentRes.result.comments,
            createdAt: Date()
          })
        )
      );

      socket.emit('send number of comments notify', { postidx: postIdx });
      socket.off('get number of comments');
      socket.on(
        'get number of comments',
        (data: { postidx: number; commentsNum: number }) => {
          const { postidx, commentsNum } = data;
          if (postIdx === postidx) setCommentsNum(commentsNum);
        }
      );

      if (currentUserName !== nickname) {
        socket.emit('send alarm', {
          sender: currentUserName,
          receiver: nickname,
          type: 'post',
          text: value
        });
      }
    }
  };

  useEffect(() => {
    setCommentList([]);
    const getPrevComments = async () => {
      const prevComments = await fetchApi.getComments(postIdx);
      const prevCommentsArray: IComment[] = prevComments.map((data: any) =>
        Object.assign({
          writer: data.BTUseruseridx.nickname,
          text: data.comments,
          createdAt: data.createdAt
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
      <ClickableProfilePhoto userName={comment.writer} size={'30px'} />
      <CommentBox>
        <CommentContent>
          <CommentTitle>
            {comment.writer}
            <CommentDate>{textUtil.timeToString(comment.createdAt)}</CommentDate>
          </CommentTitle>
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
            <ClickableProfilePhoto userName={currentUserName} size={'30px'} />
            <CommentInput
              type="text"
              autoComplete="off"
              onKeyUp={contentsBytesCheck}
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

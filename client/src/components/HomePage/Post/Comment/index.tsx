import React, { useState, useEffect, FormEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { usersocketStates } from 'recoil/socket';
import { userDataStates } from 'recoil/user';

import style from 'theme/style';
import { IComment } from 'types/comment';
import fetchApi from 'api/fetch';

import CommentListView from 'components/HomePage/Post/Comment/CommentListView';
import CommentInputBox from 'components/HomePage/Post/Comment/CommentInputBox';

const Animation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const CommentInputContainer = styled.div`
  animation-name: ${Animation};
  animation-duration: 0.5s;
  padding: ${style.padding.small};
`;

const Comment = ({
  postIdx,
  setCommentsNum,
  nickname
}: {
  postIdx: number;
  setCommentsNum: React.Dispatch<number>;
  nickname: string;
}) => {
  const [value, setValue] = useState<string>('');
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const currentUserName = useRecoilValue(userDataStates).name;
  const socket = useRecoilValue(usersocketStates);

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
      socket.on('get number of comments', (data: { postidx: number; commentsNum: number }) => {
        const { postidx, commentsNum } = data;
        if (postIdx === postidx) setCommentsNum(commentsNum);
      });

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
      setCommentList((commentList: IComment[]) => commentList.concat(prevCommentsArray));
    };

    getPrevComments();
  }, [postIdx]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      submit(e);
      setValue('');
    }
  };

  return (
    <>
      <CommentListView commentList={commentList} />
      <CommentInputContainer>
        <form onSubmit={onSubmit}>
          <CommentInputBox value={value} setValue={setValue} />
        </form>
      </CommentInputContainer>
    </>
  );
};

export default Comment;

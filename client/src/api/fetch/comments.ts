import { CommentData } from 'types/comment';

const getComments = async (postidx: number) => {
  const response = await fetch(`/api/comments/${postidx}`);
  const getCommentsList = await response.json();
  // 여기서 getCommentsList map해서 보내준다.
  return getCommentsList;
};

const getCommentsNum = async (postidx: number) => {
  const response = await fetch(`/api/comments/${postidx}`);
  const getCommentsList = await response.json();
  return getCommentsList.length;
};

const addComments = async (addComment: CommentData) => {
  const response = await fetch(`/api/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(addComment)
  });

  return await response.json();
};

export { getComments, getCommentsNum, addComments };

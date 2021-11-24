import { CommentData } from '../../types/interface';
import db from '../../models';
import './index';

const getComments = async function (postidx: number) {
  const prevComments = await db.models.Comment.findAll({
    include: [
      {
        model: db.models.User,
        as: 'BTUseruseridx'
      }
    ],
    where: { postidx: postidx },
    logging: false
  });
  return prevComments;
};

const getCommentsNum = async function (postidx: number) {
  const commentsNum = await db.models.Comment.findAll({
    where: { postidx: postidx },
    logging: false
  });
  return commentsNum.length;
};

const addComment = async function (addComment: CommentData) {
  const user = await db.models.User.findOne({
    where: { nickname: addComment.sender },
    logging: false
  });
  const userIdx: number = user?.get().idx ? user?.get().idx : -1;
  
  await db.models.Post.increment(['commentnum'], {
    where: { idx: addComment.postidx },
    logging: false
  });

  const result = await db.models.Comment.create(
    {
      ...addComment,
      useridx: userIdx
    },
    { logging: false }
  );
  return result.get();
};

export { getComments, getCommentsNum, addComment };

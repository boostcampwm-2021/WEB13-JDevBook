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

const addComment = async function (addComment: CommentData) {
  const user = await db.models.User.findOne({
    where: { nickname: addComment.sender },
    logging: false
  });
  const userIdx: number = user?.get().idx ? user?.get().idx : -1;

  const result = await db.models.Comment.create({
    ...addComment,
    useridx: userIdx
  });
  return result.get();
};

export { getComments, addComment };

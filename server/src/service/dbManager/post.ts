import { Op } from 'sequelize';

import { PostAddData, PostUpdateData } from '../../types';
import db from '../../models';

const getPosts = async (myIdx: number, lastIdx: number, count: number, useridx?: number) => {
  // 개선 못하나.. 흠
  const findAllCondition = {
    idx: { [Op.lt]: lastIdx === -1 ? 1000000000 : lastIdx },
    [Op.or]: [{ useridx: myIdx }, { secret: false }]
  };

  const findOneCondition = {
    idx: { [Op.lt]: lastIdx === -1 ? 1000000000 : lastIdx },
    useridx,
    [Op.or]: [{ useridx: myIdx }, { secret: false }]
  };

  const postsWithUser = await db.models.Post.findAll({
    include: [
      {
        model: db.models.User,
        as: 'BTUseruseridx'
      },
      {
        model: db.models.User,
        as: 'BTMLikepostidx',
        through: {
          where: { useridx: myIdx }
        }
      }
    ],
    order: [
      ['createdAt', 'DESC'],
      ['idx', 'DESC']
    ],
    where: useridx ? findOneCondition : findAllCondition,
    limit: count,
    logging: false
  });

  return postsWithUser;
};

const addPost = async (postAddData: PostAddData) => {
  const result = await db.models.Post.create(
    {
      ...postAddData
    },
    { logging: false }
  );
  return result.get();
};

const updatePost = async (postUpdateData: PostUpdateData, postIdx: number) => {
  await db.models.Post.update(postUpdateData, {
    where: { idx: postIdx },
    logging: false
  });
};

const deletePost = async (postIdx: number) => {
  await db.models.Post.destroy({ where: { idx: postIdx }, logging: false });
};

export { getPosts, addPost, updatePost, deletePost };

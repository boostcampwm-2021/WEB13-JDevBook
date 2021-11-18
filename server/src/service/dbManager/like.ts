import db from '../../models';

const toggleLikePosts = async function (useridx: number, postidx: number) {
  const [likePost, created] = await db.models.Like.findOrCreate({
    where: { useridx: useridx, postidx: postidx },
    logging: false
  });
  if (!created)
    await db.models.Like.destroy({
      where: { useridx: useridx, postidx: postidx },
      logging: false
    });
  return created;
};

const updateLikeNum = async (postIdx: number, likeNum: number) => {
  await db.models.Post.update(
    { likenum: likeNum },
    { where: { idx: postIdx }, logging: false }
  );
};

export { toggleLikePosts, updateLikeNum };

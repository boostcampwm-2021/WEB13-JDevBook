import db from '../../models';

const getGroupList = async () => {
  const groupList = await db.models.Group.findAll({
    logging: false
  });

  return groupList;
};

const getGroup = async (groupIdx: number) => {
  const group = await db.models.Group.findOne({
    where: { idx: groupIdx },
    logging: false
  });

  return group;
};

const toggleUserGroup = async function (useridx: number, groupidx: number) {
  const [userGroup, created] = await db.models.UserGroup.findOrCreate({
    where: { useridx: useridx, groupidx: groupidx },
    logging: false
  });
  if (!created)
    await db.models.UserGroup.destroy({
      where: { useridx: useridx, groupidx: groupidx },
      logging: false
    });
  return created;
};

export { getGroupList, getGroup, toggleUserGroup };

import db from '../../models';
import { Op } from 'sequelize';

const getGroupUsers = async (groupIdx: number) => {
  const groupUsers = await db.models.UserGroup.findAll({
    where: { groupidx: groupIdx },
    logging: false
  });

  const groupUsersIndex = groupUsers.map((data) => data.get().useridx);

  return groupUsersIndex;
};

const getGroupUsersName = async (groupArray: number[]) => {
  const groupUsersName = await db.models.User.findAll({
    where: { idx: { [Op.in]: groupArray } },
    logging: false
  });

  const groupUsersNameArray = groupUsersName.map(
    (data: any) => data.get().nickname
  );

  return groupUsersNameArray;
};

const getUserNumInGroup = async (groupIdx: number) => {
  const result = await db.models.UserGroup.findAndCountAll({
    where: { groupidx: groupIdx },
    logging: false
  });

  return result.count;
};

export { getGroupUsers, getGroupUsersName, getUserNumInGroup };

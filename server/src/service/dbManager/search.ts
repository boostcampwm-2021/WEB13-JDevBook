import { Op } from 'sequelize';
import db from '../../models';

const searchUsers = async (keyword: string) => {
  const users = await db.models.User.findAll({
    where: { nickname: { [Op.like]: `%${keyword}%` } },
    logging: false
  });

  return users;
};

export { searchUsers };

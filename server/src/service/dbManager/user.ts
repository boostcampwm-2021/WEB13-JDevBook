import db from '../../models';
import { IProfile } from '../../types';

const getUserData = async (username: string) => {
  const [user, created] = await db.models.User.findOrCreate({
    include: [db.models.Problem, db.models.Group],
    where: { nickname: username },
    defaults: { nickname: username },
    logging: false
  });

  return user.get();
};

const getAllUsers = async () => {
  const users = await db.models.User.findAll({ logging: false });
  return users;
};

const getAllUsersObj = async () => {
  const users = await db.models.User.findAll({ logging: false });
  const usersIdxArray = users.map((data) => data.get().idx);
  const usersNameArray = users.map((data) => data.get().nickname);
  const usersObj: any = {};
  for (let i = 0; i < usersIdxArray.length; i++) {
    usersObj[usersIdxArray[i]] = usersNameArray[i];
  }
  return usersObj;
};

const getUserName = async function (idx: number) {
  const username = await db.models.User.findOne({
    where: { idx: idx },
    logging: false
  });
  return username?.get().nickname;
};

const getUseridx = async function (name: string) {
  const user = await db.models.User.findOne({
    where: { nickname: name },
    logging: false
  });
  return user?.get().idx ? user?.get().idx : -1;
};

const getUserJoinedGroups = async (userIdx: number) => {
  const groups = await db.models.UserGroup.findAll({
    where: { useridx: userIdx },
    logging: false
  });
  return groups;
};

const setUserLoginState = async function (name: string, state: boolean) {
  await db.models.User.update(
    { loginstate: state },
    { where: { nickname: name }, logging: false }
  );
};

const getUserLoginState = async function (name: string) {
  const user = await db.models.User.findOne({
    where: { nickname: name },
    logging: false
  });

  return user?.get().loginstate;
};

const getProfile = async (userName: string) => {
  const profile = await db.models.User.findOne({
    where: { nickname: userName },
    logging: false
  });
  return profile?.get();
};

const updateProfile = async (userUpdateData: IProfile, userIdx: number) => {
  await db.models.User.update(
    { bio: userUpdateData.bio, cover: userUpdateData.cover },
    { where: { idx: userIdx }, logging: false }
  );
};

export {
  getUserData,
  getAllUsers,
  getUserName,
  getUseridx,
  setUserLoginState,
  getUserLoginState,
  getUserJoinedGroups,
  getAllUsersObj,
  updateProfile,
  getProfile
};

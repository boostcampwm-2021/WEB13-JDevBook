import db from '../../models';

import { toggleLikePosts, updateLikeNum } from './like';
import { getPosts, addPost, updatePost, deletePost } from './post';
import { getComments, getCommentsNum, addComment } from './comment';
import {
  getUserData,
  getAllUsers,
  getUseridx,
  getUserName,
  setUserLoginState,
  getUserLoginState,
  getUserJoinedGroups,
  getAllUsersObj,
  updateProfile,
  getProfile
} from './user';
import { searchUsers } from './search';
import { getProblems, insertSolvedProblem, getSolvedProblems } from './problem';
import { getGroupList, getGroup, toggleUserGroup } from './group';
import { setChatList, getChatList } from './chat';
import { setGroupChatList, getGroupChatList } from './groupchat';
import {
  getGroupUsers,
  getGroupUsersName,
  getUserNumInGroup
} from './usergroup';
import {
  addAlarm,
  getAlarmList,
  setAlarmCheck,
  getUncheckedAlarmsNum
} from './alarm';

import problems from '../../config/problems';
const group = require('../../config/initgroup.json');

const dbManager = {
  sync: async function () {
    const force: boolean = false;
    await db
      .sync({ force: force, logging: false })
      .then(async () => {
        if (force) {
          await this.createInitGroup();
          await this.createInitProblem();
        }
        console.log('Connection has been established successfully.');
      })
      .catch((error: any) => {
        console.error('Unable to connect to the database:', error);
      });
  },

  createInitGroup: async function () {
    try {
      await db.models.Group.bulkCreate(group, {
        logging: false,
        returning: true
      });
    } catch (e) {
      console.error(e);
    }
  },

  createInitProblem: async function () {
    try {
      await db.models.Problem.bulkCreate(problems, {
        logging: false,
        returning: true
      });
    } catch (e) {
      console.error(e);
    }
  },

  getUserData,
  getAllUsers,
  getUserName,
  getUseridx,

  updateProfile,
  getProfile,

  setUserLoginState,
  getUserLoginState,

  searchUsers,

  getPosts,
  addPost,
  updatePost,
  deletePost,

  setChatList,
  getChatList,

  toggleLikePosts,
  updateLikeNum,

  addComment,
  getComments,
  getCommentsNum,

  getProblems,
  insertSolvedProblem,
  getSolvedProblems,

  getGroupList,
  getGroup,
  getUserJoinedGroups,
  toggleUserGroup,

  getGroupUsers,
  getGroupUsersName,
  getUserNumInGroup,

  setGroupChatList,
  getGroupChatList,
  getAllUsersObj,

  addAlarm,
  getAlarmList,
  setAlarmCheck,
  getUncheckedAlarmsNum
};

export default dbManager;

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
import { sync, createInitGroup, createInitProblem } from './init';

const dbManager = {
  sync,
  createInitGroup,
  createInitProblem,

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

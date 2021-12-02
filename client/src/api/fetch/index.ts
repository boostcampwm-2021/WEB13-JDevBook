import { getLoginlink, isLogin } from 'api/fetch/login';
import { logout } from 'api/fetch/logout';
import { getuserData, searchUsers, getAllUsers } from 'api/fetch/users';
import { getPosts, addPosts, updatePosts, deletePosts } from 'api/fetch/posts';
import { addLikePost, updateLikeNum } from 'api/fetch/like';
import { uploadImg } from 'api/fetch/image';
import { getComments, getCommentsNum, addComments } from 'api/fetch/comments';
import {
  getProblems,
  getJoinedProblems,
  getSolvedProblems,
  insertSolvedProblem
} from 'api/fetch/problems';
import {
  getGroup,
  getGroupList,
  getJoinedGroups,
  getUserNumInGroup,
  joinGroup
} from 'api/fetch/groups';
import { getProfile, updateProfile } from 'api/fetch/profile';

const fetchApi = {
  getLoginlink,
  isLogin,

  logout,

  getuserData,
  searchUsers,
  getAllUsers,

  getPosts,
  addPosts,
  updatePosts,
  deletePosts,

  addLikePost,
  updateLikeNum,

  uploadImg,

  getComments,
  getCommentsNum,
  addComments,

  getProblems,
  insertSolvedProblem,
  getSolvedProblems,
  getJoinedProblems,

  getGroupList,
  getGroup,
  getJoinedGroups,
  joinGroup,
  getUserNumInGroup,

  getProfile,
  updateProfile
};

export default fetchApi;

import { Op } from 'sequelize';

import db from '../../models';

import { toggleLikePosts, updateLikeNum } from './like';
import { getPosts, addPost, updatePost, deletePost } from './post';

const dbManager = {
  sync: async () => {
    await db
      .sync({ force: false, logging: false })
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((error: any) => {
        console.error('Unable to connect to the database:', error);
      });
  },

  getUserdata: async (username: string) => {
    const [user, created] = await db.models.User.findOrCreate({
      where: { nickname: username },
      defaults: { nickname: username },
      logging: false
    });

    return user.get();
  },

  searchUsers: async (keyword: string) => {
    const users = await db.models.User.findAll({
      where: { nickname: { [Op.like]: `%${keyword}%` } },
      logging: false
    });

    return users;
  },

  getPosts,
  addPost,
  updatePost,
  deletePost,

  getAllUsers: async () => {
    const users = await db.models.User.findAll({ logging: false });
    return users;
  },

  getUserName: async function (idx: number) {
    const username = await db.models.User.findOne({
      where: { idx: idx },
      logging: false
    });
    return username?.get().nickname;
  },

  getUseridx: async function (name: string) {
    const user = await db.models.User.findOne({
      where: { nickname: name },
      logging: false
    });

    return user?.get().idx ? user?.get().idx : -1;
  },

  getChatList: async function (sender: string, receiver: string) {
    const senderidx: number = await this.getUseridx(sender);
    const receiveridx: number = await this.getUseridx(receiver);

    const allChats = await db.models.Chat.findAll({
      where: {
        [Op.or]: [
          { senderidx: senderidx, receiveridx: receiveridx },
          { senderidx: receiveridx, receiveridx: senderidx }
        ]
      },
      logging: false
    });
    const allChatsArray = allChats.map((data: any) => data.get());

    return {
      senderidx: senderidx,
      receiveridx: receiveridx,
      previousMsg: allChatsArray
    };
    //console.log(allChatsArray); // 없거나 오류여도 [] 나옴

    /*
      { senderdix: ?
        receiveridx: ?
        chat: ?}, 
        줄줄이
    */
  },

  setChatList: async function (sender: string, receiver: string, msg: string) {
    const senderidx: number = await this.getUseridx(sender);
    const receiveridx: number = await this.getUseridx(receiver);
    await db.models.Chat.create({
      senderidx: senderidx,
      receiveridx: receiveridx,
      content: msg,
      logging: false
    });
  },

  addComment: async function (
    sender: string,
    postidx: number,
    comments: string
  ) {
    const useridx: number = await this.getUseridx(sender);
    await db.models.Comment.create({
      postidx: postidx,
      useridx: useridx,
      comments: comments
    });
  },

  toggleLikePosts,
  updateLikeNum,

  getComments: async function (postidx: number) {
    const prevComments = await db.models.Comment.findAll({
      where: { postidx: postidx }
    });
    const prevCommentsArray = prevComments.map((data: any) => data.get());
    for (let i = 0; i < prevCommentsArray.length; i++) {
      prevCommentsArray[i].username = await this.getUserName(
        prevCommentsArray[i].useridx
      );
    }
    return prevCommentsArray;
  }
};

export default dbManager;
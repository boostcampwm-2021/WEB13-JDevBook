import db from '../../models';
import { Op } from 'sequelize';

const setChatList = async function (
  sender: string,
  receiver: string,
  msg: string
) {
  const senderData = await db.models.User.findOne({
    where: { nickname: sender },
    logging: false
  });

  const receiverData = await db.models.User.findOne({
    where: { nickname: receiver },
    logging: false
  });

  const senderidx: number = senderData?.get().idx ? senderData?.get().idx : -1;
  const receiveridx: number = receiverData?.get().idx
    ? receiverData?.get().idx
    : -1;
  await db.models.Chat.create(
    {
      senderidx: senderidx,
      receiveridx: receiveridx,
      content: msg
    },
    { logging: false }
  );
};

const getChatList = async function (sender: string, receiver: string) {
  const senderData = await db.models.User.findOne({
    where: { nickname: sender },
    logging: false
  });

  const receiverData = await db.models.User.findOne({
    where: { nickname: receiver },
    logging: false
  });

  const senderidx: number = senderData?.get().idx ? senderData?.get().idx : -1;
  const receiveridx: number = receiverData?.get().idx
    ? receiverData?.get().idx
    : -1;

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
};

export { setChatList, getChatList };

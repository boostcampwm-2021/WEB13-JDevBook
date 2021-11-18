import db from '../../models';
import { Op } from 'sequelize';

const setGroupChatList = async (
  sender: string,
  groupidx: number,
  msg: string
) => {
  const senderData = await db.models.User.findOne({
    where: { nickname: sender },
    logging: false
  });

  const senderidx: number = senderData?.get().idx ? senderData?.get().idx : -1;

  await db.models.GroupChat.create(
    {
      useridx: senderidx,
      groupidx: groupidx,
      content: msg
    },
    { logging: false }
  );
};

const getGroupChatList = async (groupidx: number) => {
  const allGroupChats = await db.models.GroupChat.findAll({
    where: { groupidx: groupidx },
    logging: false
  });

  const allGroupChatsArray = allGroupChats.map((data: any) => data.get());

  return allGroupChatsArray;
};

export { setGroupChatList, getGroupChatList };

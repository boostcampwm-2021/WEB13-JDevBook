import dbManager from '../service/dbManager';

const groupChatSocket = ({ socket, io }: any) => {
  socket.on(
    'enter group notify',
    async (receivedData: { groupidx: number }) => {
      const { groupidx } = receivedData;
      const getGroupUsersIdx = await dbManager.getGroupUsers(groupidx);
      const getGroupUsersName = await dbManager.getGroupUsersName(
        getGroupUsersIdx
      );
      io.emit('get group users', getGroupUsersName);
    }
  );

  socket.on(
    'send group message',
    async (receivedData: {
      sender: string;
      groupidx: number;
      message: string;
    }) => {
      const { sender, groupidx, message } = receivedData;
      await dbManager.setGroupChatList(sender, groupidx, message);
      const msg: string = `${sender}: ${message}`;

      io.emit('receive group message', {
        sender: sender,
        groupidx: groupidx,
        msg: msg
      });
    }
  );

  socket.on(
    'send group chat initial',
    async (receivedData: { sender: string; groupidx: number }) => {
      const { sender, groupidx } = receivedData;
      socket.name = sender;

      const previousMsg = await dbManager.getGroupChatList(groupidx);
      const usersObj = await dbManager.getAllUsersObj();
      const filteredMsgs: string[] = previousMsg.map((msg) => {
        return `${usersObj[msg.useridx]}: ${msg.content}`;
      });
      io.to(socket.id).emit('get previous group chats', filteredMsgs);
    }
  );
};

export default groupChatSocket;

import dbManager from '../service/dbManager';

const chatSocket = ({ socket, io }: any) => {
  socket.on(
    'send chat initial',
    async (receivedData: { sender: string; receiver: string }) => {
      const { sender, receiver } = receivedData;
      socket.name = sender;

      const { senderidx, previousMsg } = await dbManager.getChatList(
        sender,
        receiver
      );

      const filteredAlarms: string[] = previousMsg.map((msg) => {
        if (msg.senderidx === senderidx) return `${sender}: ${msg.content}`;
        else return `${receiver}: ${msg.content}`;
      });

      io.to(socket.id).emit('get previous chats', filteredAlarms);
    }
  );

  socket.on(
    'send message',
    async (receivedData: {
      sender: string;
      receiver: string;
      message: string;
    }) => {
      const { sender, receiver, message } = receivedData;

      if (socket.name === sender || socket.name === receiver) {
        const msg: string = `${sender}: ${message}`;
        await dbManager.setChatList(sender, receiver, message);

        io.emit('receive message', {
          sender: sender,
          receiver: receiver,
          msg: msg
        });
      }
    }
  );
};

export default chatSocket;

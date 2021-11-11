import dbManager from '../service/dbManager';
import { Socket, Server } from 'socket.io';
import { addAssociation } from 'sequelize-typescript';

declare module 'socket.io' {
  interface Socket {
    name: string;
    get: boolean;
  }
}

interface IComment {
  writer: string;
  text: string;
}

const socketIO = (server: any) => {
  const io = new Server(server);
  io.on('connection', (socket: Socket) => {
    socket.on('name', (username: string) => {
      socket.name = username;
    });

    socket.on('send chat initial', async (receivedData) => {
      const { sender, receiver } = receivedData;

      const { senderidx, receiveridx, previousMsg } =
        await dbManager.getChatList(sender, receiver);

      const filteredMsgs: string[] = previousMsg.map((msg) => {
        if (msg.senderidx === senderidx) return `${sender}: ${msg.content}`;
        else return `${receiver}: ${msg.content}`; // msg.senderidx === receiveridx
      });

      io.to(socket.id).emit('get previous chats', filteredMsgs);
    });

    socket.on('send message', (receivedData) => {
      const { sender, receiver, message } = receivedData;

      if (socket.name === sender || socket.name === receiver) {
        const msg: string = `${sender}: ${message}`;
        dbManager.setChatList(sender, receiver, message); // await 안써줘도 될듯?

        io.emit('receive message', {
          sender: sender,
          receiver: receiver,
          msg: msg
        });
      }
    });

    socket.on('add comment', (receivedData) => {
      const { sender, postidx, comments } = receivedData;
      dbManager.addComment(sender, postidx, comments);

      io.emit('receive comment', {
        sender: sender,
        postidx: postidx,
        comments: comments
      });
    });

    socket.on('send comments initial', async (receivedData) => {
      const { postidx } = receivedData;
      const prevComments: any = await dbManager.getComments(postidx);
      const filteredComments: IComment[] = prevComments.map((data: any) => {
        return {
          writer: data.username,
          text: data.comments
        };
      });
      io.emit('get previous comments', filteredComments);
    });

    socket.on('disconnect', () => {
      socket.get = false;
      console.log(`${socket.name}:${socket.id} disconnected`);
    });
  });

  //io.on("forceDisconnect")
  //io.on("disconnect")
};

export default socketIO;

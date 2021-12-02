import { Socket, Server } from 'socket.io';
import chatSocket from './chatSocket';
import groupChatSocket from './groupChatSocket';
import commentSocket from './commentSocket';
import alarmSocket from './alarmSocket';
import postSocket from './postSocket';
import { IUserSocket } from '../types';

const UserObj: IUserSocket = {};

const socketIO = (server: any) => {
  const io = new Server(server);
  io.on('connection', (socket: Socket) => {
    socket.on(
      'login notify',
      async (userData: { socketId: string; userName: string }) => {
        UserObj[userData.socketId] = userData.userName;
        io.emit('get current users', UserObj);
      }
    );

    chatSocket({ socket, io });
    groupChatSocket({ socket, io });
    postSocket({ socket });
    commentSocket({ socket, io });
    alarmSocket({ socket, io });

    socket.on('disconnect notify', () => {
      socket.get = false;
      delete UserObj[socket.id];
      io.emit('get current users', UserObj);
      console.log(`${socket.name}:${socket.id} disconnected`);
    });

    socket.on('disconnect', () => {
      socket.get = false;
      delete UserObj[socket.id];
      io.emit('get current users', UserObj);
      console.log(`${socket.name}:${socket.id} disconnected`);
    });
  });
};

export default socketIO;

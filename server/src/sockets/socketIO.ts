import { Socket } from 'socket.io';

declare module 'socket.io' {
  interface Socket {
    name: string;
  }
}

const socketIO = (server: any) => {
  const io = require('socket.io')(server);

  io.on('connection', (socket: Socket) => {
    socket.on('name', (username: string) => {
      socket.name = username;
    });
    socket.on('send message', (receivedata) => {
      const { sender, receiver, message } = receivedata;
      if (socket.name === sender || socket.name === receiver) {
        // db 저장
        const msg: string = `${sender}: ${message}`;
        io.emit('receive message', {
          sender: sender,
          receiver: receiver,
          msg: msg
        });
      }
    });
  });

  //io.on("forceDisconnect")
  //io.on("disconnect")
};

export default socketIO;

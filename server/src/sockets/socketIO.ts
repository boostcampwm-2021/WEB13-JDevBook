import dbManager from '../service/dbManager'; // 왜 절대경로 안되지
import { Socket, Server } from 'socket.io';
import { IUserSocket } from '../types/interface';

const UserObj: IUserSocket = {};


const socketIO = (server: any) => {
  const io = new Server(server);
  io.on('connection', (socket: Socket) => {
    // socket.on('name', (username: string) => {
    //   socket.name = username;
    // });

    // 유저 접속 부분
    socket.on('login notify', async (userData:{socketId:string, userName: string}) => {
      UserObj[userData.socketId] = userData.userName;
      io.emit('get current users', UserObj);
    });

    // 1:1 채팅 이전 메시지 가져오는 부분
    socket.on('send chat initial', async (receivedData) => {
      const { sender, receiver } = receivedData;
      socket.name = sender;

      const { senderidx, receiveridx, previousMsg } =
        await dbManager.getChatList(sender, receiver);

      const filteredMsgs: string[] = previousMsg.map((msg) => {
        if (msg.senderidx === senderidx) return `${sender}: ${msg.content}`;
        else return `${receiver}: ${msg.content}`; // msg.senderidx === receiveridx
      });

      io.to(socket.id).emit('get previous chats', filteredMsgs);
    });

    // 1:1 채팅 메시지 송수신 부분
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


    socket.on('post_added', () => {
      socket.broadcast.emit('post_added');
    });


    // 그룹 유저들 가져오는 부분
    // socket.on('asd', (dd) => {
    //   console.log(dd);
    //   const asd = dbManager.getGroupUsers(dd.groupidx); 
    //   console.log(asd);
    // })
    socket.on('enter group notify', async(receivedData) => {
      const {groupidx} = receivedData;
      const getGroupUsersIdx = await dbManager.getGroupUsers(groupidx);
      const getGroupUsersName = await dbManager.getGroupUsersName(getGroupUsersIdx);
      io.emit('get group users', getGroupUsersName);
    })

    socket.on('send group message', async (receivedData) => {
      const { sender, groupidx, message } = receivedData;
      await dbManager.setGroupChatList(sender, groupidx, message);
      const msg: string = `${sender}: ${message}`;

      io.emit('receive group message', {
        sender: sender,
        groupidx: groupidx,
        msg: msg
      })
    });

    socket.on('send group chat initial', async (receivedData) => {
      const { sender, groupidx } = receivedData;
      socket.name = sender;

      const previousMsg = await dbManager.getGroupChatList(groupidx);
      const usersObj = await dbManager.getAllUsersObj();
      const filteredMsgs: string[] = previousMsg.map((msg) => {
        return `${usersObj[msg.useridx]}: ${msg.content}`;
      });
      io.to(socket.id).emit('get previous group chats', filteredMsgs);
    });


    // 유저 로그아웃 부분
    socket.on('disconnect', () => {
      socket.get = false;
      delete UserObj[socket.id];
      io.emit('get current users', UserObj);
      console.log(`${socket.name}:${socket.id} disconnected`);
    });
  });

  //io.on("forceDisconnect")
  //io.on("disconnect")
};

export default socketIO;

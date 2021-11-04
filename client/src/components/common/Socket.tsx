import socketClient from 'socket.io-client';
const host: string = 'http://localhost:4000'; //process.env.REACT_APP_HOST ?? 'https://jdevbook.kro.kr/';
const socket = socketClient(host, {
  transports: ['websocket']
});
//const io = require('socket.io-client');
//const socket = io.connect("http://localhost:4000");

export default socket;

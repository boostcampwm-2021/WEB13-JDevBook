import { io, Socket } from 'socket.io-client';
const host: string = '/';
const socket: Socket = io(host);
//socket.disconnect();
export default socket;

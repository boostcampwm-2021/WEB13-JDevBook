import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userDataStates, usersocketStates } from 'recoil/store';
import { io, Socket } from 'socket.io-client';

const InitSocket = () => {
  // const [socket, setSocket] = useRecoilState(usersocketStates);
  // const userdata = useRecoilValue(userDataStates);

  // useEffect(() => {
  //   if (userdata.name !== '') {
  //     const host: string = '/';
  //     const newsocket: Socket = io(host);
  //     setSocket(newsocket);
  //     console.log(newsocket);
  //     //console.log(io('/'));
  //     //newsocket.emit('name', userdata.name);
  //   }
  // }, [userdata.name]);

  return <></>;
};

export default InitSocket;

/*
      const host: string = '/';
      const newsocket: Socket = io(host);
      export default newsocket;
*/

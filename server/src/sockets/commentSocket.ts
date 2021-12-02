import dbManager from '../service/dbManager';

const commentSocket = ({ socket, io }: any) => {
  socket.on(
    'send number of comments notify',
    async (receivedData: { postidx: number }) => {
      const { postidx } = receivedData;
      const commentsNum = await dbManager.getCommentsNum(postidx);
      io.emit('get number of comments', {
        postidx: postidx,
        commentsNum: commentsNum
      });
    }
  );
};

export default commentSocket;

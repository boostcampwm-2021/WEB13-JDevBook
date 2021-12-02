const postSocket = ({ socket }: any) => {
  socket.on('post_added', () => {
    socket.broadcast.emit('post_added');
  });
};

export default postSocket;

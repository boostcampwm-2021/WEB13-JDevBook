import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { usersocketStates } from 'recoil/store';
import { Alert } from './Alert';

const NewPostAlert = () => {
  const socket = useRecoilValue(usersocketStates);
  const [newPostCount, setNewPostCount] = useState<number>(0);

  useEffect(() => {
    socket.on('post_added', () => {
      setNewPostCount((prev) => prev + 1);
    });
    return () => {
      socket.off('post_added');
    };
  });

  return newPostCount > 0 ? (
    <Alert count={newPostCount} setCount={setNewPostCount} />
  ) : (
    <></>
  );
};

export default NewPostAlert;

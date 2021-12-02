import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { usersocketStates } from 'recoil/socket';

import { Alert } from 'components/common/NewPostAlert/Alert';

const NewPostAlert = ({ reloadList }: { reloadList: () => void }) => {
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

  return newPostCount > 0 ? <Alert count={newPostCount} setCount={setNewPostCount} reloadList={reloadList} /> : <></>;
};

export default NewPostAlert;

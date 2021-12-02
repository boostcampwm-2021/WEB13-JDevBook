import { IProfile } from 'types/user';

const getProfile = async (userName: string) => {
  const response = await fetch(`/api/profile/${userName}`);
  return await response.json();
};

const updateProfile = async (userUpdateData: IProfile) => {
  const response = await fetch(`/api/profile/${userUpdateData.idx}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userUpdateData)
  });
  return await response.json();
};

export { getProfile, updateProfile };

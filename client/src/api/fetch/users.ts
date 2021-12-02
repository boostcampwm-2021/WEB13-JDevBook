const getuserData = async () => {
  // { data, error }
  const userDataRes: Response = await fetch('/api/data');
  return await userDataRes.json();
};

const searchUsers = async (keyword: string) => {
  const usersRes: Response = await fetch(`/api/users?keyword=${keyword}`);
  return await usersRes.json();
};

const getAllUsers = async () => {
  const allusersRes: Response = await fetch('/api/allUsers');
  return await allusersRes.json();
};

export { getuserData, searchUsers, getAllUsers };

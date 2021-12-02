const getGroupList = async () => {
  const response = await fetch('/api/groups');
  return await response.json();
};

const getGroup = async (groupIdx: number) => {
  const response = await fetch(`/api/groups/${groupIdx}`);
  return await response.json();
};

const getJoinedGroups = async (userIdx: number) => {
  const response = await fetch(`/api/groups/joined/${userIdx}`);
  return await response.json();
};

const joinGroup = async (userIdx: number, groupIdx: number) => {
  const response = await fetch(`/api/joingroup/${userIdx}/${groupIdx}`, {
    method: 'POST'
  });
  return await response.json();
};

const getUserNumInGroup = async (groupIdx: number) => {
  const response = await fetch(`/api/groups/usernum/${groupIdx}`);
  return await response.json();
};

export {
  getGroup,
  getGroupList,
  getJoinedGroups,
  getUserNumInGroup,
  joinGroup
};

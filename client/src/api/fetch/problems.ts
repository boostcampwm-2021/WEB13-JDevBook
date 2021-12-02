const getProblems = async (groupIdx?: number | null, signal?: AbortSignal) => {
  const response = groupIdx
    ? await fetch(`/api/problems/${groupIdx}`, { signal })
    : await fetch(`/api/problems`, { signal });
  const problems = await response.json();
  return problems;
};

const insertSolvedProblem = async (problemIdx: number) => {
  const response = await fetch(`/api/problems/correct`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ problemIdx })
  });
  return await response.json();
};

const getSolvedProblems = async (userName: string) => {
  const response = await fetch(`/api/problems/solved/${userName}`);
  return await response.json();
};

const getJoinedProblems = async (userIdx: number) => {
  const response = await fetch(`/api/problems/joined/${userIdx}`);
  return await response.json();
};

export {
  getProblems,
  getJoinedProblems,
  getSolvedProblems,
  insertSolvedProblem
};

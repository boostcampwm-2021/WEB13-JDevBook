import { PostData, PostAddData, PostUpdateData, PostRequestOptions } from 'types/post';

const getPosts = async (
  signal: AbortSignal | null = null,
  option: Partial<PostRequestOptions> = {}
): Promise<PostData[]> => {
  const { lastIdx = -1, count = 10, username } = option;
  const response = username
    ? await fetch(`/api/posts?username=${username}&lastIdx=${lastIdx}&count=${count}`, { signal })
    : await fetch(`/api/posts?lastIdx=${lastIdx}&count=${count}`, { signal });
  const getPostsList = await response.json();
  return getPostsList.map((cur: any) =>
    cur.BTMLikepostidx.length === 0 ? { ...cur, likeFlag: false } : { ...cur, likeFlag: true }
  );
};

const addPosts = async (postData: PostAddData) => {
  const response = await fetch(`/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  });
  return await response.json();
};

const updatePosts = async (postIdx: number, postUpdateData: PostUpdateData) => {
  const response = await fetch(`/api/posts/${postIdx}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postUpdateData)
  });
  return await response.json();
};

const deletePosts = async (postIdx: number) => {
  const response = await fetch(`/api/posts/${postIdx}`, {
    method: 'DELETE'
  });
  return await response.json();
};

export { getPosts, addPosts, updatePosts, deletePosts };

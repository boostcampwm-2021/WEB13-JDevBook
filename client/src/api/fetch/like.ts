const addLikePost = async (userIdx: number, postIdx: number) => {
  const response = await fetch(`/api/likes/${userIdx}/${postIdx}`, {
    method: 'POST'
  });
  return await response.json();
};

const updateLikeNum = async (postIdx: number, likeNum: number) => {
  const response = await fetch(`/api/posts/like/${postIdx}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ likeNum: likeNum })
  });
  return await response.json();
};

export { addLikePost, updateLikeNum };

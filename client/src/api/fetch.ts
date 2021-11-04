const getData = {
  getusername: () => {
    return fetch('/api/data').then((res) => res.json());
  },
  logout: () => {
     fetch('/ouath/logout')
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        //socket.disconnect();
        //저장 데이터도 다 제거
        window.location.href = '/';
      });
  },
  searchUsers: async (keyword: string) => {
    const response = await fetch(`/api/users?keyword=${keyword}`);
    return await response.json();
  }
};

export default getData;

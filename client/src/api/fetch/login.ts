const getLoginlink = async (): Promise<string> => {
  const loginLinkRes: Response = await fetch('/oauth/login');
  return await loginLinkRes.json();
};
const isLogin = async () => {
  const response: Response = await fetch('/api/islogin');
  return await response.json();
};

export { getLoginlink, isLogin };

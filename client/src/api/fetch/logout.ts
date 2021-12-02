const logout = async () => {
  await fetch('/oauth/logout');
};

export { logout };

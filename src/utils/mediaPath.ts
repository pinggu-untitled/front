const mediaPath = (url?: string) => {
  return url?.startsWith('http') ? url : `http://localhost:8080/uploads/profile/${url}`;
};

export default mediaPath;

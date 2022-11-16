type Type = 'profile' | 'post';

const mediaPath = (type: Type, url?: string) => {
  if (type === 'post') return `http://localhost:8080/uploads/${url}`;
  return url?.startsWith('http') ? url : `http://localhost:8080/uploads/profile/${url}`;
};

export default mediaPath;

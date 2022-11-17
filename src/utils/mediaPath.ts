type Type = 'profile' | 'post';

const mediaPath = (type: Type, url?: string) => {
  if (type === 'post') return `${import.meta.env.VITE_HOST}/uploads/${url}`;
  return url?.startsWith('http') ? url : `${import.meta.env.VITE_HOST}/uploads/profile/${url}`;
};

export default mediaPath;

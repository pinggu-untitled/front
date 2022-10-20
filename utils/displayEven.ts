const displayEven = <T>(data: T[]): T[] => {
  const len = data.length;
  return len % 2 === 0 ? data : data.slice(0, len - 1);
};

export default displayEven;

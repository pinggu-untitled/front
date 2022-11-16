const debounce = (cb: () => void, dealy: number) => {
  let timer: number;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(cb, dealy, ...args);
  };
};
export default debounce;

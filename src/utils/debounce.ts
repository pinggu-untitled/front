const debounce = (cb: (map: kakao.maps.Map | null) => void, dealy: number) => {
  let timer: number;
  return (...args: unknown[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(cb, dealy, ...args);
  };
};
export default debounce;

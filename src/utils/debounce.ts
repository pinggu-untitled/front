const debounce = (
  cb:
    | ((map: kakao.maps.Map | null, tab: string, filter: string, keyword: string) => void)
    | (({ coords: { latitude, longitude } }: { coords: { latitude: number; longitude: number } }) => void),
  delay: number,
) => {
  let timer: number;
  return (...args: unknown[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(cb, delay, ...args);
  };
};
export default debounce;

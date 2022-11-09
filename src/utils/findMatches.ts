const findMatches = (
  data: string,
  reg: RegExp,
  mapFn: (v: string, i: number) => void
) => {
  const temp = data?.match(reg) ?? [];
  return temp.map(mapFn);
};

export default findMatches;

const compose =
  (...fns: Function[]) =>
  (arg: any): any[] =>
    fns.reduce((composed, fn) => fn(composed), arg);

export default compose;

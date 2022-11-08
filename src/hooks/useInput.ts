import { Dispatch, SetStateAction, useState } from 'react';

const useInput = <T = any>(initialValue: T): [T, (e: any) => void, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(initialValue);
  const handler = (e: any) => setValue(e.target.value);
  return [value, handler, setValue];
};

export default useInput;
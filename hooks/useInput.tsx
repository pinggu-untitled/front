import { useState, Dispatch, SetStateAction } from 'react';

const useInput = <T,>(initialValue: T): [T, (e: any) => void, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(initialValue);
  const handler = (e: any) => setValue(e.target.value);
  return [value, handler, setValue];
};

export default useInput;

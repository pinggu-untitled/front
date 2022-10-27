import { SetStateAction } from 'react';
import axios from 'axios';
import { Dispatch } from 'react';

const onActivate = (url: string, setState: Dispatch<SetStateAction<boolean | null>>) => {
  axios
    .post(url)
    .then((res) => {
      console.log(`Activate is ${res.data.message}`);
      setState((p) => !p);
    })
    .catch((err) => console.error(err));
};
const onDeActivate = (url: string, setState: Dispatch<SetStateAction<boolean | null>>) => {
  axios
    .delete(url)
    .then((res) => {
      console.log(`Deactivate is ${res.data.message}`);
      setState((p) => !p);
    })
    .catch((err) => console.error(err));
};

type Type = 'activate' | 'deactivate';
const actionHandler = (type: Type, url: string, setState: Dispatch<SetStateAction<boolean | null>>) => (e: any) => {
  e.stopPropagation();
  type === 'activate' ? onActivate(url, setState) : onDeActivate(url, setState);
};

export default actionHandler;

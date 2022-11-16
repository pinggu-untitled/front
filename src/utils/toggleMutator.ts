import axios from 'axios';

const activate = (url: string, toggleState: (p: boolean) => void) => {
  axios.post(url).then(() => {
    toggleState(true);
  });
};
const deActivate = (url: string, toggleState: (p: boolean) => void) => {
  axios.delete(url).then(() => {
    toggleState(false);
  });
};

type Type = 'active' | 'inactive';
const toggleMutator = (type: Type, url: string, toggleState: (p: boolean) => void) => (e: any) => {
  e.stopPropagation();
  type === 'active' ? activate(url, toggleState) : deActivate(url, toggleState);
};

export default toggleMutator;

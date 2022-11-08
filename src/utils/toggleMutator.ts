import axios from 'axios';

const activate = (url: string, toggleState: any) => {
  axios.post(url).then((res) => {
    console.log('>>> active');
    toggleState(true);
  });
};
const deActivate = (url: string, toggleState: any) => {
  axios.delete(url).then((res) => {
    console.log('>>> in-active');
    toggleState(false);
  });
};

type Type = 'active' | 'inactive';
const toggleMutator = (type: Type, url: string, toggleState: any) => (e: any) => {
  e.stopPropagation();
  type === 'active' ? activate(url, toggleState) : deActivate(url, toggleState);
};

export default toggleMutator;

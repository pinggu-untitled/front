import { Dispatch, SetStateAction, useState } from 'react';

interface IObject {
  [key: string]: boolean;
}

const makeObject = (arr: string[]) =>
  arr.reduce((reduced, name) => {
    const copy: IObject = { ...reduced };
    copy[name] = false;
    return copy;
  }, {});

// 여러 개 모달을 객체로 만들어 관리하고 싶을 때 사용하는 커스텀 훅.
// Dispatch<SetStateAction<IObject>> 변형해서 넘겨주기(handler)
const useModals = (...modalNames: string[]): [IObject, (modalName: string) => () => void] => {
  const initialValues = makeObject(modalNames);
  const [modals, setModals] = useState<IObject>(initialValues);
  const handler = (modalName: string) => () => {
    setModals((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
  };

  return [modals, handler];
};

export default useModals;

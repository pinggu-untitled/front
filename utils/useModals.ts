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

const useModals = (
  ...modalNames: string[]
): [IObject, (modalName: string) => () => void, Dispatch<SetStateAction<IObject>>] => {
  const initialValues = makeObject(modalNames);
  const [modals, setModals] = useState<IObject>(initialValues);
  const handler = (modalName: string) => () => {
    setModals((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
  };

  return [modals, handler, setModals];
};

export default useModals;

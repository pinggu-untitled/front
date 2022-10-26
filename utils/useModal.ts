// 한 개의 모달을 사용하고 싶을 때 사용하는 커스텀 훅.

import { useState } from 'react';

const useModal = (initialValue: boolean = false) => {
  const [showModal, setShowModal] = useState(initialValue);
  const toggleModal = () => setShowModal((prev) => !prev);

  return [showModal, toggleModal];
};

export default useModal;

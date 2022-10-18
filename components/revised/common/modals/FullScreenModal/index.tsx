import React, { FC, useCallback } from 'react';
import styled from '@emotion/styled';
interface IProps {
  show: boolean;
  onCloseModal: () => void;
  children: React.ReactNode;
}

export const Base = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 4000;
`;

const FullScreenModal: FC<IProps> = ({ show, onCloseModal, children }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;
  return (
    <Base onClick={onCloseModal}>
      <div onClick={stopPropagation}>{children}</div>
    </Base>
  );
};

export default FullScreenModal;

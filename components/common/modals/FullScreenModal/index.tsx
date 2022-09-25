import React, { CSSProperties, FC, useCallback } from 'react';
import styled from '@emotion/styled';

interface IProps {
  children: React.ReactNode;
  show: boolean;
  onCloseModal?: () => void;
  style?: CSSProperties;
}

export const Base = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 3000;
`;

const FullScreenModal: FC<IProps> = ({ children, show, onCloseModal, style }) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <Base onClick={onCloseModal}>
      <div onClick={stopPropagation} style={style}>
        {children}
      </div>
    </Base>
  );
};

export default FullScreenModal;

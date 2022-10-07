import React, { CSSProperties, FC, useMemo, useRef } from 'react';
import styled from '@emotion/styled';

interface IProps {
  icon: React.ReactNode;
  onClick: () => void;
  colors: any;
  [key: string]: any;
}

export const Base = styled.div<{ colors: any }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease;
  font-size: 25px;
  background-color: ${({ colors }) => colors.background ?? 'transparent'};
  color: ${({ colors }) => colors.font};

  &:hover {
    background: ${({ colors }) => !colors.background && 'rgba(0, 0, 0, 0.08)'};
  }
`;

const ToolButton: FC<IProps> = ({ icon, onClick, colors, rest }) => {
  return (
    <Base onClick={onClick} colors={colors} {...rest}>
      {icon}
    </Base>
  );
};

export default ToolButton;

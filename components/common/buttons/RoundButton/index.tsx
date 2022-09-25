import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface IProps {
  content: string | React.ReactNode;
  onClick: () => void;
  style?: CSSProperties;
}

export const Base = styled.div<{ theme: any }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dfdfdf;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const RoundButton = ({ content, onClick, style }: IProps) => {
  const theme = useTheme();
  return (
    <Base style={style} theme={theme} onClick={onClick}>
      {content}
    </Base>
  );
};

export default RoundButton;

import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';

interface IProps {
  content: string;
  onClick: () => void;
  style?: CSSProperties;
  [key: string]: any;
}

export const Button = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

const SquareButton = ({ content, onClick, rest }: IProps) => {
  return (
    <Button onClick={onClick} {...rest}>
      {content}
    </Button>
  );
};

export default SquareButton;

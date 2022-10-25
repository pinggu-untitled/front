import React, { FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  valid: boolean;
  content: string;
  onClick?: () => void;
}

export const Button = styled.button<{ valid: boolean }>`
  height: 40px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  background-color: ${({ valid }) => (valid ? '#0295f6' : 'rgba(0,0,0,0.1)')};
  color: ${({ valid }) => (valid ? '#fff' : 'gray')};
  cursor: ${({ valid }) => (valid ? 'pointer' : 'text')};
  transition: 0.2s;
  //width: 100%;
  //position: absolute;
  //bottom: 20px;
  //left: 20px;
  //right: 20px;
  position: fixed;
  bottom: 20px;
  width: 400px;
`;

const SquareSubmitButton: FC<IProps> = ({ valid, content, onClick }) => {
  return (
    <Button valid={valid} disabled={!valid} onClick={onClick}>
      {content}
    </Button>
  );
};

export default SquareSubmitButton;

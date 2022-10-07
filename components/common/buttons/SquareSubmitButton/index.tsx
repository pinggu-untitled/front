import React, { FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  valid: boolean;
  content: string;
}

export const Button = styled.button<{ valid: boolean }>`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  background-color: ${({ valid }) => (valid ? '#0295f6' : 'rgba(0,0,0,0.1)')};
  color: ${({ valid }) => (valid ? '#fff' : 'gray')};
  cursor: ${({ valid }) => (valid ? 'pointer' : 'text')};
  transition: 0.2s;
`;

const SquareSubmitButton: FC<IProps> = ({ valid, content }) => {
  return (
    <Button type={'submit'} valid={valid} disabled={!valid}>
      {content}
    </Button>
  );
};

export default SquareSubmitButton;

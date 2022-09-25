import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface IProps {
  content: string;
  onClick: () => void;
}

export const Item = styled.li<{ theme: any }>`
  width: 100%;
  font-size: 14px;
  padding: 8px 10px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;

const ModalItem = ({ content, onClick }: IProps) => {
  const theme = useTheme();
  return (
    <Item onClick={onClick} theme={theme}>
      {content}
    </Item>
  );
};

export default ModalItem;

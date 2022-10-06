import React, { CSSProperties, FC } from 'react';
import styled from '@emotion/styled';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #dfdfdf;
  box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
  overflow: hidden;

  & li:not(:last-child) {
    border-bottom: 1px solid #dfdfdf;
  }
`;

interface IProps {
  children: React.ReactNode;
  style?: CSSProperties;
}

const MenuList: FC<IProps> = ({ children, style }) => {
  return <List style={style}>{children}</List>;
};

export default MenuList;

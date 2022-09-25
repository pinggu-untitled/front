import React, { CSSProperties, FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  children: React.ReactNode;
  style?: CSSProperties;
}

export const Base = styled.div``;
export const List = styled.ul``;

const SearchResultList: FC<IProps> = ({ children, style }) => {
  return (
    <Base style={style}>
      <List>{children}</List>
    </Base>
  );
};

export default SearchResultList;

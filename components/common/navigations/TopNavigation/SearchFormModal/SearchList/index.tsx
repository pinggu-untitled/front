import React from 'react';
import styled from '@emotion/styled';

interface IProps {
  children: React.ReactNode;
}

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;

  & li {
    margin-right: 5px;
    margin-bottom: 5px;
  }
`;
const SearchHistoryList = ({ children }: IProps) => {
  return <List>{children}</List>;
};

export default SearchHistoryList;

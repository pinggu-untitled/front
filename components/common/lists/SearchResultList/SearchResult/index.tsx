import React from 'react';
import styled from '@emotion/styled';

export const Base = styled.li`
  padding: 3px 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

interface IProps {
  content: string;
  onClick: (content: string) => void;
}

const SearchResult = ({ content, onClick }: IProps) => {
  return <Base onClick={() => onClick(content)}>{content}</Base>;
};

export default SearchResult;

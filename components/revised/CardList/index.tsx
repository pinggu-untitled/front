import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Scrollbars } from 'react-custom-scrollbars-2';
import useSWR from 'swr';
import { IPostCard } from '@typings/db';
import fetcher from '@utils/fetcher';
import PostCard from './PostCard';

export const Base = styled.ul`
  padding: 0 20px;
  width: 100%;
`;

interface IProps {
  children: React.ReactNode;
}
const CardList: FC<IProps> = ({ children }) => {
  return (
    // <Scrollbars universal={true}>
    <Base>{children}</Base>
    // </Scrollbars>
  );
};

export default CardList;

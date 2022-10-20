import React, { FC } from 'react';
import styled from '@emotion/styled';

export const Base = styled.ul`
  padding: 0 20px;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

interface IProps {
  children: React.ReactNode;
}
const CardList: FC<IProps> = ({ children }) => {
  return <Base>{children}</Base>;
};

export default CardList;

import React, { FC } from 'react';
import styled from '@emotion/styled';
import TapItem, { ITap } from './TapItem/index';
interface IProps {
  count: number;
  children: React.ReactNode;
}

export const Base = styled.div<{ col: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${({ col }) => col}, 1fr);
  padding: 0 50px;
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  & button:not(:last-of-type) > a > span {
    border-right: 1px solid #dfdfdf;
  }
`;

const TapList: FC<IProps> = ({ count, children }) => {
  return <Base col={count}>{children}</Base>;
};

export default TapList;

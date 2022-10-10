import React, { FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  children: React.ReactNode;
}

export const Base = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding: 16px 0;

  & li:not(:last-of-type) {
    border-right: 1px solid rgba(0, 0, 0, 0.05);
  }
`;

const ActionButtonList: FC<IProps> = ({ children }) => {
  return <Base>{children}</Base>;
};

export default ActionButtonList;

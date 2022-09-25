import React, { FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  children: React.ReactNode;
  onClick: any;
}

export const Base = styled.li`
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 33px;
  border: 1px solid #dfdfdf;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  position: relative;
`;

const PillItem: FC<IProps> = ({ children, onClick }) => {
  return <Base onClick={onClick}>{children}</Base>;
};

export default PillItem;

import React, { FC } from 'react';
import styled from '@emotion/styled';

export interface IProps {
  children: React.ReactNode;
}

export const Base = styled.div`
  width: 100vw;
  height: 100vh;
`;

const FullLayout: FC<IProps> = ({ children }) => {
  return <Base>{children}</Base>;
};

export default FullLayout;

import React, { FC } from 'react';

import styled from '@emotion/styled';

export const Header = styled.header`
  position: fixed;
  top: 0;
  width: 440px;
  height: 73px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dfdfdf;
`;

interface IProps {
  children: React.ReactNode;
}

const FixedHeader: FC<IProps> = ({ children }) => {
  return <Header>{children}</Header>;
};

export default FixedHeader;

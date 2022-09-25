import React, { FC } from 'react';
import styled from '@emotion/styled';

export interface IProps {
  children: React.ReactNode;
}

export const Base = styled.div`
  width: 100vw;
  height: 100vh;
  //background-color: rgba(0, 0, 0, 0.4);
`;

export const Header = styled.header`
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #dfdfdf;
`;
export const Main = styled.div``;
export const Footer = styled.footer``;

const FullLayout: FC<IProps> = ({ children }) => {
  return (
    <Base>
      <Header></Header>
      {children}
    </Base>
  );
};

export default FullLayout;

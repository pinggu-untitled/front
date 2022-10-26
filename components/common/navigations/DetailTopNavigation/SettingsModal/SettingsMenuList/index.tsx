import React, { FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  children: React.ReactNode;
}

export const Base = styled.ul`
  width: 100%;

  & li:not(:last-of-type) {
    border-bottom: 1px solid #dfdfdf;
  }
`;

const SettingsMenuList: FC<IProps> = ({ children }) => {
  return <Base>{children}</Base>;
};

export default SettingsMenuList;

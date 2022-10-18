import React from 'react';
import styled from '@emotion/styled';

export const Base = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 68px;
  height: 100vh;
  border-right: 1px solid #dfdfdf;
  background-color: #fff;
  z-index: 3000;
`;

const SideNavigation = () => {
  return <Base></Base>;
};

export default SideNavigation;

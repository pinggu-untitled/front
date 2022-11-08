import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const Side = styled.nav`
  width: 73px;
  height: 100vh;
  position: fixed;
  border-right: 1px solid #dfdfdf;
  z-index: 1100;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
`;

export const NavItemList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;

  > h1 {
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 26px 0;
    height: 70px;
  }

  > li:not(:last-of-type) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

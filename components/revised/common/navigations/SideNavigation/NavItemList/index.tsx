import React, { FC } from 'react';
import styled from '@emotion/styled';
import NavItem, { IItem } from '@components/revised/common/navigations/SideNavigation/NavItemList/NavItem';
import { v4 as uuid } from 'uuid';
interface IProps {
  items: IItem[];
}

export const Base = styled.ul``;

const NavItemList: FC<IProps> = ({ items }) => {
  return (
    <Base>
      {items.map((item) => (
        <NavItem key={uuid()} {...item} />
      ))}
    </Base>
  );
};

export default NavItemList;

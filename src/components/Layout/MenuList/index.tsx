import MenuItem, { IMenuItem } from '@components/Layout/MenuList/MenuItem';
import { Ul } from '@components/Layout/MenuList/style';
import { CSSProperties } from 'react';

interface IProps {
  items: IMenuItem[];
  style?: CSSProperties;
  onClick?: () => void;
  href?: string;
}

const MenuList = ({ items, style, onClick }: IProps) => {
  return (
    <Ul style={style} onClick={onClick}>
      {items.map((item, i) => (
        <MenuItem key={i} {...item} />
      ))}
    </Ul>
  );
};

export default MenuList;

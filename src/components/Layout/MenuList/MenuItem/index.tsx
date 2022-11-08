import { ReactNode } from 'react';
import { Li } from '@components/Layout/MenuList/style';
import { Link } from 'react-router-dom';

export interface IMenuItem {
  icon: ReactNode;
  title: string;
  onClick?: () => void;
  href?: string;
}

const MenuItem = ({ icon, title, onClick, href }: IMenuItem) => {
  return (
    <Li onClick={onClick}>
      {href ? (
        <a href={href} className={'inner'}>
          <span className={'icon'}>{icon}</span>
          <span className={'title'}>{title}</span>
        </a>
      ) : (
        <div className={'inner'}>
          <span className={'icon'}>{icon}</span>
          <span className={'title'}>{title}</span>
        </div>
      )}
    </Li>
  );
};

export default MenuItem;

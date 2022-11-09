import { CSSProperties, ReactNode, useReducer } from 'react';
import { Li } from '@components/Layout/SideNavigation/NavItem/style';
import { NavLink } from 'react-router-dom';

interface IProps {
  icons: { outline: ReactNode; fill: ReactNode; style?: CSSProperties };
  title: string;
  url: string;
  [key: string]: any;
}

const NavItem = ({
  icons: { outline, fill, style },
  title,
  url,
  rest,
}: IProps) => {
  const activeStyle = { backgroundColor: '#f0f0f0' };
  return (
    <Li>
      <NavLink
        to={url}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        {({ isActive }) =>
          isActive ? (
            <>
              <span className={'icon'} style={style}>
                {fill}
              </span>
              <span className={'title'}>{title}</span>
            </>
          ) : (
            <>
              <span className={'icon'} style={style}>
                {outline}
              </span>
              <span className={'title'}>{title}</span>
            </>
          )
        }
      </NavLink>
    </Li>
  );
};

export default NavItem;

import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Link, useLocation, useMatch } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import { useTheme } from '@emotion/react';

interface IProps {
  icon: React.ReactNode;
  title: string;
  url: string;
  match: string;
}

export const Base = styled.li<{ theme: any; active: boolean }>`
  > a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ active }) => (active ? '#000' : 'gray')};
    font-weight: ${({ active }) => (active ? 700 : 400)};
    display: flex;
    align-items: center;
    font-size: 14px;

    & svg {
      font-size: 18px;
      margin-right: 2px;
    }
  }
`;

const NestedButton: FC<IProps> = ({ icon, title, url, match }) => {
  const theme = useTheme();
  const active = useMatch(match);

  return (
    <Base theme={theme} active={Boolean(active)}>
      <Link to={url}>
        {icon}
        {title}
      </Link>
    </Base>
  );
};

export default NestedButton;

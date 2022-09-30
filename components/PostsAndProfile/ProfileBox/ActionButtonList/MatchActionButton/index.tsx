import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Link, useLocation, useMatch } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import { useTheme } from '@emotion/react';

interface IProps {
  content: string | React.ReactNode;
  url: string;
  match: string;
}

export const Base = styled.li<{ theme: any; active: boolean }>`
  > a {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${({ active }) => (active ? '#000' : 'gray')};
    font-weight: ${({ active }) => (active ? 700 : 400)};
  }
`;

const MatchActionButton: FC<IProps> = ({ content, url, match }) => {
  const theme = useTheme();
  const active = useMatch(match);

  return (
    <Base theme={theme} active={Boolean(active)}>
      <Link to={url}>
        <a>{content}</a>
      </Link>
    </Base>
  );
};

export default MatchActionButton;

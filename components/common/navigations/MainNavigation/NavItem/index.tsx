import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface IProps {
  url: string;
  contents: { icons: { filled: React.ReactNode; outlined: React.ReactNode }; title: string };
}

export const Base = styled.li<{ theme: any; active: boolean }>`
  & a {
    width: 100%;
    height: 68px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.2s;

    & .icon {
      font-size: 22px;
    }
    & .title {
      font-size: 13px;
      color: ${({ theme }) => theme.colors.gray[800]};
      margin-top: 5px;
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray[100]};
    }
  }
`;

const NavItem = ({ url, contents }: IProps) => {
  const theme = useTheme();
  const { pathname } = useLocation();
  return (
    <Base theme={theme} active={pathname === url}>
      <Link to={url}>
        <span className={'icon'}>{pathname === url ? contents.icons['filled'] : contents.icons['outlined']}</span>
        <span className={'title'}>{contents.title}</span>
      </Link>
    </Base>
  );
};

export default NavItem;

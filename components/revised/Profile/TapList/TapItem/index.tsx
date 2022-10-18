import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate, useMatch } from 'react-router-dom';

export interface ITap {
  icon: React.ReactNode;
  name: string;
  url: string;
  match: string;
}

export const Base = styled.button<{ active: boolean }>`
  width: 100%;
  background-color: transparent;
  border: none;
  cursor: pointer;

  > a {
    width: 100%;
    height: 100%;
    display: block;
    color: ${({ active }) => (active ? '#000' : 'gray')};
    font-weight: ${({ active }) => (active ? 700 : 400)};
    display: flex;
    align-items: center;
    font-size: 14px;
    height: 45px;

    > .wrapper {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      & svg {
        font-size: 18px;
        margin-right: 3px;
        transform: translateY(-1px);
      }
    }
  }
`;

const TapItem: FC<ITap> = ({ icon, name, url, match }) => {
  const navigate = useNavigate();
  const active = useMatch(match);

  return (
    <Base active={Boolean(active)}>
      <Link to={`${url}`}>
        <span className="wrapper">
          {icon}
          {name}
        </span>
      </Link>
    </Base>
  );
};

export default TapItem;

import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useMatch, useNavigate } from 'react-router-dom';

export interface IItem {
  icon: { filled: React.ReactNode; outlined: React.ReactNode };
  title: string;
  path: string;
}

export const Base = styled.li<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: ${({ active }) => (active ? 'rgba(0,0,0,0.05)' : 'transparent')};
  font-weight: ${({ active }) => (active ? '700' : '500')};
  cursor: pointer;

  > .icon {
    font-size: 22px;
    margin-bottom: -6px;
  }

  > .title {
    font-size: 12px;
  }
`;

const NavItem: FC<IItem> = ({ icon: { filled, outlined }, title, path }) => {
  const navigate = useNavigate();
  const isMatched = useMatch(path);
  const handleNavigate = (path: string) => () => navigate(path === '/' ? '/?moveCenter=true' : path);

  return (
    <Base onClick={handleNavigate(path)} active={Boolean(isMatched)}>
      <span className={'icon'}>{isMatched ? filled : outlined}</span>
      <span className={'title'}>{title}</span>
    </Base>
  );
};

export default NavItem;

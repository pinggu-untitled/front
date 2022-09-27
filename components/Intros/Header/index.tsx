import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

interface IProps {
  url: string;
  name: string;
}

export const Base = styled.header`
  width: 100%;
  height: 70px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Logo = styled.span`
  font-family: 'Orbitron', sans-serif;
  font-size: 30px;
`;
export const ToggleButton = styled.div`
  background-color: #000;
  color: #fff;
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;
const Header: FC<IProps> = ({ url, name }) => {
  const navigate = useNavigate();
  return (
    <Base>
      <Logo>Pinggu</Logo>
      <ToggleButton onClick={() => navigate(url)}>{name}</ToggleButton>
    </Base>
  );
};

export default Header;

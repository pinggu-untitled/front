import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface IProps {
  icon: React.ReactNode;
  onClick: () => void;
}

export const Item = styled.button`
  font-size: 22px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  background: transparent;

  &:active {
    opacity: 0.5;
  }
`;

const ActionItem = ({ icon, onClick }: IProps) => {
  return <Item onClick={onClick}>{icon}</Item>;
};

export default ActionItem;

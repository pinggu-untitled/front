import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Link, useLocation, useMatch } from 'react-router-dom';
import { useRouteMatch } from 'react-router';

interface IProps {
  content: string;
  onClick: () => void;
}

export const Base = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ActionButton: FC<IProps> = ({ content, onClick }) => {
  return <Base onClick={onClick}>{content}</Base>;
};

export default ActionButton;

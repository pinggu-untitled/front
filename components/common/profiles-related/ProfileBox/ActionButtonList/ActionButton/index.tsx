import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Link, useLocation, useMatch } from 'react-router-dom';
import { useRouteMatch } from 'react-router';

interface IProps {
  content: string | React.ReactNode;
  onClick: () => void;
}

export const Base = styled.li`
  display: flex;
  justify-content: center;
  cursor: pointer;

  & svg {
    font-size: 22px;
  }
`;

const ActionButton: FC<IProps> = ({ content, onClick }) => {
  return <Base onClick={onClick}>{content}</Base>;
};

export default ActionButton;

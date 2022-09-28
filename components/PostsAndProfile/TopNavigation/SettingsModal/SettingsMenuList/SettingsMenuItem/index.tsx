import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface IProps {
  content: string;
  onClick: () => void;
}

export const Base = styled.li`
  width: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease;
  cursor: pointer;
  font-size: 15px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const SettingsMenuItem: FC<IProps> = ({ content, onClick }) => {
  const theme = useTheme();
  return (
    <Base onClick={onClick} theme={theme}>
      {content}
    </Base>
  );
};

export default SettingsMenuItem;

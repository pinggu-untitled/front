import React, { FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  content: string;
  onClick: () => void;
}

export const Base = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 33px;
  border: 1px solid #dfdfdf;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  position: relative;
  background-color: #fff;
`;

const PillButton: FC<IProps> = ({ content, onClick }) => {
  return <Base onClick={onClick}>{content}</Base>;
};

export default PillButton;

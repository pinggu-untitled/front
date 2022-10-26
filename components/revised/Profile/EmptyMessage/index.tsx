import React, { FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  message: string;
}

export const Base = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 13px;
  color: gray;
`;
const EmptyMessage: FC<IProps> = ({ message }) => {
  return <Base>{message}</Base>;
};

export default EmptyMessage;

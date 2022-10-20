import React, { FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  text: string;
}

export const Base = styled.div`
  display: inline-block;
  padding: 6px 10px 4px;
  border: 1px solid #dfdfdf;
  border-radius: 20px;
  font-size: 12px;
  color: gray;
`;
const PillBox: FC<IProps> = ({ text }) => {
  return <Base>{text}</Base>;
};

export default PillBox;

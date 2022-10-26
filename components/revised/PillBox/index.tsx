import React, { CSSProperties, FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  text: string;
  style?: CSSProperties;
}

export const Base = styled.div`
  display: inline-block;
  padding: 6px 10px 4px;
  font-weight: 600;
  border: 1px solid #dfdfdf;
  border-radius: 20px;
  font-size: 12px;
  color: gray;
`;
const PillBox: FC<IProps> = ({ text, style }) => {
  return <Base style={style}>{text}</Base>;
};

export default PillBox;

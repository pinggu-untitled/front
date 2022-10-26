import React, { CSSProperties, FC } from 'react';
import styled from '@emotion/styled';

export const Base = styled.ul`
  padding: 0 20px;
  width: 100%;
  height: 100%;
  overflow: scroll;

  > li:not(:last-of-type) {
    border-bottom: 1px solid #dfdfdf;
  }
`;

interface IProps {
  children: React.ReactNode;
  style?: CSSProperties;
}
const CardList: FC<IProps> = ({ children, style }) => {
  return <Base style={style}>{children}</Base>;
};

export default CardList;

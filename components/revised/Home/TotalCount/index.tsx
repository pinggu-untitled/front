import React, { CSSProperties, FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  current: number | string;
  total?: number;
  style?: CSSProperties;
}

export const Base = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 13px;
  color: lightgray;
  padding: 3px 8px 1px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.7);

  > .current {
    color: #fff;
  }
`;

const TotalCount: FC<IProps> = ({ current, total, style }) => {
  return (
    <Base>
      <span className="current">{current}</span>
      {total && `/${total}`}
    </Base>
  );
};

export default TotalCount;

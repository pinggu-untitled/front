import React, { FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  length: number;
}

export const Base = styled.div`
  padding: 1.5px 6px 0.5px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 13px;
  > .total {
    color: #bbbbbb;
  }
`;

const CountPill: FC<IProps> = ({ length }) => {
  return (
    <Base>
      1<span className="total">/{length}</span>
    </Base>
  );
};

export default CountPill;

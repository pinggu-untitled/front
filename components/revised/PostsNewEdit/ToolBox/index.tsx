import React, { FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  title: string;
  children: React.ReactNode;
}

export const Base = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 1px solid #dfdfdf;
  padding: 10px 12px;
  border-radius: 4px;

  > .title {
    font-size: 15px;
    font-weight: 600;
  }

  > .buttons {
    display: flex;
    align-items: center;

    > div:not(:last-of-type) {
      margin-right: 5px;
    }
  }
`;

const ToolBox: FC<IProps> = ({ title, children }) => {
  return (
    <Base>
      <span className={'title'}>{title}</span>
      <div className={'buttons'}>{children}</div>
    </Base>
  );
};

export default ToolBox;

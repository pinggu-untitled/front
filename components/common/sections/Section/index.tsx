import React, { FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  title: string;
  children: React.ReactNode;
}

export const Base = styled.section`
  width: 100%;
  border-top: 1px solid #dfdfdf;

  > h3 {
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    height: 50px;
    border-bottom: 1px solid #dfdfdf;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
`;

const Section: FC<IProps> = ({ title, children }) => {
  return (
    <Base>
      <h3>{title}</h3>
      <div>{children}</div>
    </Base>
  );
};

export default Section;

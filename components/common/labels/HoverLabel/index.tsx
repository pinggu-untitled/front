import React, { CSSProperties, FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  label: string;
  children: React.ReactNode;
  style: CSSProperties;
}

export const Base = styled.div`
  position: relative;
  > .label {
    height: 30px;
    padding: 0 10px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 4px;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    visibility: hidden;
    opacity: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transition: 0.2s;
  }

  > .content:hover + .label {
    opacity: 1;
    visibility: visible;
  }
`;
const HoverLabel: FC<IProps> = ({ label, children, style }) => {
  return (
    <Base>
      <div className={'content'}>{children}</div>
      <div className={'label'} style={style}>
        {label}
      </div>
    </Base>
  );
};

export default HoverLabel;

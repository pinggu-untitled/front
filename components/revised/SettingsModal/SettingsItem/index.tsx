import React, { FC } from 'react';
import styled from '@emotion/styled';

export interface IItem {
  content: { icon: React.ReactNode; title: string; rest?: React.ReactNode };
  onClick: any;
}

export const Base = styled.button`
  width: 100%;
  padding: 3px;
  display: flex;
  transition: 0.2s ease;
  cursor: pointer;
  border: none;
  background-color: transparent;
  position: relative;

  > .wrapper {
    padding: 8px 16px;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 4px;
    transition: 0.2s;
    font-size: 14px;

    > .icon {
      margin-right: 12px;
      font-size: 17px;
      transform: translateY(1px);
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  > .hidden {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3000;
    opacity: 0;

    > a,
    div,
    form,
    span {
      position: absolute;
      bottom: 0;
      top: 0;
      left: 0;
      right: 0;
      opacity: 0;
      z-index: 3000;
    }
  }
`;

const SettingItem: FC<IItem> = ({ content: { icon, title, rest }, onClick }) => {
  return (
    <Base onClick={onClick}>
      <div className="wrapper">
        <span className="icon">{icon}</span>
        {title}
      </div>
      {rest && <div className="hidden">{rest}</div>}
    </Base>
  );
};

export default SettingItem;

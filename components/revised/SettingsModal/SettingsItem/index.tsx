import React, { FC } from 'react';
import styled from '@emotion/styled';

export interface IItem {
  content: { icon: React.ReactNode; title: string; rest?: React.ReactDOM };
  onClick: any;
  children?: React.ReactNode;
}

export const Base = styled.button`
  width: 100%;
  padding: 3px;
  display: flex;
  transition: 0.2s ease;
  cursor: pointer;
  border: none;
  background-color: transparent;

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
    width: 0;
    height: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
  }
`;

const SettingItem: FC<IItem> = ({ content: { icon, title, rest }, onClick, children }) => {
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

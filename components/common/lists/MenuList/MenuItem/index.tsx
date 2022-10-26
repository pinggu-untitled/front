import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface IProps {
  icon: React.ReactNode;
  content: string | React.ReactNode;
  onClick: () => void;
}

export const Item = styled.li<{ theme: any }>`
  width: 100%;
  font-size: 14px;
  height: 40px;
  padding: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;

  > .inner-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    transition: 0.2s;
    padding: 0 10px;
    border-radius: 4px;

    > .icon {
      font-size: 18px;
      margin-right: 10px;
      transform: translateY(-1px);
    }

    > .content {
      font-size: 14px;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
`;

const ModalItem = ({ icon, content, onClick }: IProps) => {
  const theme = useTheme();
  return (
    <Item onClick={onClick} theme={theme}>
      <div className={'inner-wrapper'}>
        <span className={'icon'}>{icon}</span>
        <span className={'content'}>{content}</span>
      </div>
    </Item>
  );
};

export default ModalItem;

import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface IProps {
  icon: React.ReactNode;
  content: string | React.ReactNode;
  onClick: (e: any) => void;
  children?: React.ReactNode;
}

export const Button = styled.button<{ theme: any }>`
  width: 100%;
  font-size: 14px;
  height: 40px;
  padding: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: #fff;
  border: none;
  position: relative;

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

  > .form-wrapper {
    position: absolute;
    width: 0px;
    height: 0px;
    bottom: 0;
    left: 0;
    opacity: 0;
  }
`;

const CopyButton = ({ icon, content, onClick, children }: IProps) => {
  const theme = useTheme();
  return (
    <Button onClick={onClick} theme={theme} type={'button'}>
      <div className={'inner-wrapper'}>
        <span className={'icon'}>{icon}</span>
        <span className={'content'}>{content}</span>
      </div>
      <div className={'form-wrapper'}>{children}</div>
    </Button>
  );
};

export default CopyButton;

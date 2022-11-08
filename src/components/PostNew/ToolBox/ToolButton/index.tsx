import React, { ReactNode } from 'react';
import { Button } from '@components/PostNew/ToolBox/ToolButton/style';

interface IProps {
  icon: ReactNode;
  onClick: () => void;
  colors: any;
  [key: string]: any;
}

const ToolButton = ({ icon, onClick, colors, rest }: IProps) => {
  return (
    <Button onClick={onClick} colors={colors} {...rest}>
      {icon}
    </Button>
  );
};

export default ToolButton;

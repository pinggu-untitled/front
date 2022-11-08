import { Box } from '@components/PostNew/ToolBox/style';
import { ReactNode } from 'react';

interface IProps {
  title: string;
  children: ReactNode;
}

const ToolBox = ({ title, children }: IProps) => {
  return (
    <Box>
      <span className={'title'}>{title}</span>
      <div className={'buttons'}>{children}</div>
    </Box>
  );
};

export default ToolBox;

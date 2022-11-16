import { CSSProperties, FC, memo, ReactNode } from 'react';
import { MovingLabel } from '@components/PostNew/HoverLabel/style';

interface IProps {
  label: string;
  children: ReactNode;
  style: CSSProperties;
}

const HoverLabel: FC<IProps> = ({ label, children, style }) => {
  return (
    <MovingLabel>
      <div className={'content'}>{children}</div>
      <div className={'label'} style={style}>
        {label}
      </div>
    </MovingLabel>
  );
};

export default memo(HoverLabel);

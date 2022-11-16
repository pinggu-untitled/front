import { CSSProperties, ReactNode } from 'react';
import { FullScreen, HalfScreen } from '@components/Modal/style';

type Size = 'full' | 'half';

interface IProps {
  size?: Size;
  children: ReactNode;
  show: boolean;
  onCloseModal?: () => void;
  style?: CSSProperties;

  [key: string]: any;
}

const Modal = ({ size = 'full', children, show, onCloseModal, style, rest }: IProps) => {
  if (!show) return null;

  return size === 'full' ? (
    <FullScreen onClick={onCloseModal} style={style} {...rest}>
      <div aria-hidden="true" onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        {children}
      </div>
    </FullScreen>
  ) : (
    <HalfScreen onClick={onCloseModal} style={style} {...rest}>
      <div aria-hidden="true" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </HalfScreen>
  );
};

export default Modal;

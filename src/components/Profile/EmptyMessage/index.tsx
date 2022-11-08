import { Message } from '@components/Profile/EmptyMessage/style';
import { CSSProperties, ReactNode } from 'react';

interface IProps {
  message: string | ReactNode;
  style?: CSSProperties;
}
const EmptyMessage = ({ message, style }: IProps) => {
  return <Message style={style}>{message}</Message>;
};

export default EmptyMessage;

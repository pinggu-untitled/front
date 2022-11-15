import { ReactNode } from 'react';
import { List } from '@components/Home/CardList/style';

interface IProps {
  children: ReactNode;
  setSize?: (index: number) => void;
}
const CardList = ({ children, setSize }: IProps) => {
  return <List>{children}</List>;
};

export default CardList;

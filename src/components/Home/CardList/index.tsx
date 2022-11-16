import { ReactNode } from 'react';
import { List } from '@components/Home/CardList/style';

const CardList = ({ children }: { children: ReactNode }) => {
  return <List>{children}</List>;
};

export default CardList;

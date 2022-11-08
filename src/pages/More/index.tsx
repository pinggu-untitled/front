import PageHeader from '@components/headers/PageMainHeader';
import { ReactNode } from 'react';

const More = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <PageHeader pageName={'더보기'} />
    </div>
  );
};

export default More;

import React, { FC } from 'react';
import PreviousButton from '@components/common/buttons/PreviousButton';
import FixedHeader from '@components/common/headers/FixedHeader';

interface IProps {
  children: React.ReactNode;
  onClick: () => void;
}

const PrevButtonHeader: FC<IProps> = ({ children, onClick }) => {
  return (
    <FixedHeader>
      <PreviousButton onClick={onClick} />
      {children}
    </FixedHeader>
  );
};

export default PrevButtonHeader;

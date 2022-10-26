import React, { FC, memo, CSSProperties } from 'react';
import { HiPlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Base } from './styles';
interface IProps {
  to: string;
}

const NavigateButton: FC<IProps> = ({ to }) => {
  const navigate = useNavigate();

  return (
    <Base onClick={() => navigate(to)}>
      <HiPlus />
    </Base>
  );
};

export default memo(NavigateButton);

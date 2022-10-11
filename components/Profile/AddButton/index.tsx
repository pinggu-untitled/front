import React, { FC, memo, CSSProperties } from 'react';
import styled from '@emotion/styled';
import { HiPlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

interface IProps {
  to: string;
}

export const Base = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

const NavigateButton: FC<IProps> = ({ to }) => {
  const navigate = useNavigate();

  return (
    <Base onClick={() => navigate(to)}>
      <HiPlus />
    </Base>
  );
};

export default memo(NavigateButton);

import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import PreviousButton from '@components/common/buttons/PreviousButton';

interface IProps {
  onClick: () => void;
  title?: string;
}

export const Header = styled.header`
  position: fixed;
  top: 0;
  width: 440px;
  height: 73px;
  border-bottom: 1px solid #dfdfdf;
  padding: 0 20px;
  display: flex;
  align-items: center;

  & h1 {
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 2px);
    font-size: 22px;
    font-weight: 700;
  }
`;

const PrevButtonHeader: FC<IProps> = ({ onClick, title }) => {
  const navigate = useNavigate();

  return (
    <Header>
      <PreviousButton onClick={onClick} />
      {title && <h1>{title}</h1>}
    </Header>
  );
};

export default PrevButtonHeader;

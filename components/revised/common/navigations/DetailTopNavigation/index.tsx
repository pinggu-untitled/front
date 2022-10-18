import React, { FC } from 'react';
import styled from '@emotion/styled';
import { MdArrowBackIosNew } from 'react-icons/md';
import { TbDotsVertical } from 'react-icons/tb';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

interface IProps {
  prev: string;
  toggleOptions: () => void;
}

export const Base = styled.header`
  position: fixed;
  top: 0;
  width: 440px;
  height: 73px;
  border-bottom: 1px solid #dfdfdf;
  border-right: 1px solid #dfdfdf;
  background-color: #fff;
  padding: 0 10px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  z-index: 4000;
  cursor: pointer;

  > .title {
    position: absolute;
    top: 53%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 22px;
    font-weight: 700;
  }
`;

export const Button = styled.div`
  width: 40px;
  height: 40px;
  font-size: 22px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  cursor: pointer;
  /* color: #777777; */
  border: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  &:active {
    border: 1px solid #dfdfdf;
  }
`;

const DetailTopNavigation: FC<IProps> = ({ prev, toggleOptions }) => {
  const navigate = useNavigate();
  return (
    <Base>
      <Button onClick={() => navigate(prev)}>
        <BsArrowLeft />
      </Button>
      <Button onClick={toggleOptions}>
        <TbDotsVertical />
      </Button>
    </Base>
  );
};

export default DetailTopNavigation;

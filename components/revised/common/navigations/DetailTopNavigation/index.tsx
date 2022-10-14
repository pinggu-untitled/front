import React, { FC } from 'react';
import styled from '@emotion/styled';
import { MdArrowBackIosNew } from 'react-icons/md';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

interface IProps {
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
  justify-content: space-between;
  z-index: 4000;
  cursor: pointer;
`;

export const Button = styled.div`
  width: 40px;
  height: 40px;
  font-size: 19px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  cursor: pointer;
  color: #777777;

  &:hover {
    /* border: 1px solid #dfdfdf; */
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const DetailTopNavigation: FC<IProps> = ({ toggleOptions }) => {
  const navigate = useNavigate();
  return (
    <Base>
      <Button onClick={() => navigate(-1)}>
        <MdArrowBackIosNew />
      </Button>
      <Button onClick={toggleOptions}>
        <HiOutlineDotsVertical />
      </Button>
    </Base>
  );
};

export default DetailTopNavigation;

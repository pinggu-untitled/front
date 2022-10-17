import React, { FC } from 'react';
import styled from '@emotion/styled';
import { MdArrowBackIosNew } from 'react-icons/md';
import { TbDotsVertical } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

interface IProps {
  title: string | React.ReactNode;
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
  z-index: 4000;
  cursor: pointer;

  > h2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
  }
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

const TitleNavigation: FC<IProps> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <Base>
      <Button onClick={() => navigate(-1)}>
        <MdArrowBackIosNew />
      </Button>
      <h2> {title}</h2>
    </Base>
  );
};

export default TitleNavigation;

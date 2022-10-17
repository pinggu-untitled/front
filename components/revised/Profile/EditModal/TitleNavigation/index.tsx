import React, { FC } from 'react';
import styled from '@emotion/styled';
import { MdArrowBackIosNew } from 'react-icons/md';
import { IoHomeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { Base, Button } from '../../../common/navigations/DetailTopNavigation';
interface IProps {
  children: string | React.ReactNode;
}

const TitleNavigation: FC<IProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <Base>
      <Button onClick={() => navigate(-1)}>
        <BsArrowLeft />
      </Button>
      <div className="title">{children}</div>
      <Button onClick={() => navigate('/')}>
        <IoHomeOutline />
      </Button>
    </Base>
  );
};

export default TitleNavigation;

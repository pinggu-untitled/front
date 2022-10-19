import React, { FC } from 'react';
import styled from '@emotion/styled';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface IProps {
  title: string | React.ReactNode;
}
import { Base, Button } from '../DetailTopNavigation';

export const Navigation = styled(Base)`
  > h1 {
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
  }
`;

const TitleNavigation: FC<IProps> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <Navigation>
      <Button onClick={() => navigate(-1)}>
        <MdArrowBackIosNew />
      </Button>
      <h1> {title}</h1>
    </Navigation>
  );
};

export default TitleNavigation;

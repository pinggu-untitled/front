import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

interface IProps {
  onClickPrev: () => void;
  title: string | React.ReactNode;
}
import { Base, Button } from '../DetailTopNavigation';
import { BsArrowLeft } from 'react-icons/bs';

export const Navigation = styled(Base)`
  > h1 {
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
  }
`;

const TitleNavigation: FC<IProps> = ({ onClickPrev, title }) => {
  return (
    <Navigation>
      <Button onClick={onClickPrev}>
        <BsArrowLeft />
      </Button>
      <h1>{title}</h1>
    </Navigation>
  );
};

export default TitleNavigation;

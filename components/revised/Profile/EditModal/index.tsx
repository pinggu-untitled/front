import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Button } from '@components/revised/common/navigations/DetailTopNavigation';
import { Navigation } from '@components/revised/common/navigations/TitleNavigation';
import { Base } from '../../SearchModal';
import { BsArrowLeft } from 'react-icons/bs';

interface IProps {
  show: boolean;
  onCloseModal: () => void;
  title: { maintitle: string; highlight: number };
  children: React.ReactNode;
}

export const HighLight = styled.span`
  font-size: 18px;
  color: orangered;
`;

export const MainContent = styled.div`
  margin-top: 73px;
  height: calc(100vh - 73px);
  width: 440px;
  overflow: scroll;
`;

const EditModal: FC<IProps> = ({ show, onCloseModal, title: { maintitle, highlight }, children }) => {
  if (!show) return null;
  return (
    <Base>
      <Navigation>
        <Button onClick={onCloseModal}>
          <BsArrowLeft />
        </Button>
        <h1>
          {maintitle} <HighLight>({highlight})</HighLight>
        </h1>
      </Navigation>
      <MainContent>{children}</MainContent>
    </Base>
  );
};

export default EditModal;

import React, { FC } from 'react';
import FullScreenModal from '@components/revised/common/modals/FullScreenModal';
import styled from '@emotion/styled';
import TitleNavigation from '@components/revised/Profile/EditModal/TitleNavigation';
import CardList from '@components/revised/CardList';
interface IProps {
  show: boolean;
  onCloseModal: () => void;
  title: { main: string; count: number };
  children: React.ReactNode;
}

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 68px;
  width: 440px;
  height: 100vh;
  z-index: 4000;
  background-color: #fff;

  & .content {
    padding-top: 70px;
    background-color: red;
    width: 100%;
  }
`;

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

const EditModal: FC<IProps> = ({ show, onCloseModal, title: { main, count }, children }) => {
  return (
    <FullScreenModal show={show} onCloseModal={onCloseModal}>
      <Wrapper>
        <TitleNavigation>
          {main} <HighLight>({count})</HighLight>
        </TitleNavigation>
        <MainContent>{children}</MainContent>
      </Wrapper>
    </FullScreenModal>
  );
};

export default EditModal;

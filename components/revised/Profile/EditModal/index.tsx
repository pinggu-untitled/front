import React, { FC } from 'react';
import styled from '@emotion/styled';
import TitleNavigation, { Navigation } from '@components/revised/common/navigations/TitleNavigation';
import { Base } from '../../SearchModal';

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
      <TitleNavigation
        onClickPrev={onCloseModal}
        title={
          <>
            {maintitle} <HighLight>({highlight})</HighLight>
          </>
        }
      />
      <MainContent>{children}</MainContent>
    </Base>
  );
};

export default EditModal;

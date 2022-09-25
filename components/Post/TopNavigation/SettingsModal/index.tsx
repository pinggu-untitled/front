import React, { FC } from 'react';
import InnerModal from '@components/common/modals/InnerModal';
import styled from '@emotion/styled';
import SettingsMenuList from '@components/Post/TopNavigation/SettingsModal/SettingsMenuList';
import SettingsMenuItem from '@components/Post/TopNavigation/SettingsModal/SettingsMenuList/SettingsMenuItem';

interface IProps {
  show: boolean;
  onCloseModal: () => void;
}

export const ModalContent = styled.div`
  width: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border: 1px solid #dfdfdf;
  overflow: hidden;
  border-radius: 4px;
`;

const SettingsModal: FC<IProps> = ({ show, onCloseModal }) => {
  return (
    <InnerModal show={show} onCloseModal={onCloseModal}>
      <ModalContent>
        <SettingsMenuList>
          <SettingsMenuItem content={'게시물 삭제'} onClick={() => console.log('delete')} />
          <SettingsMenuItem content={'게시물 공유하기'} onClick={() => console.log('share')} />
          <SettingsMenuItem content={'게시물 신고하기'} onClick={() => console.log('watch')} />
        </SettingsMenuList>
      </ModalContent>
    </InnerModal>
  );
};

export default SettingsModal;

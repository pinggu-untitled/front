import React, { FC } from 'react';
import InnerModal from '@components/common/modals/InnerModal';
import styled from '@emotion/styled';
import SettingsMenuList from '@components/PostsAndProfile/TopNavigation/SettingsModal/SettingsMenuList';
import SettingsMenuItem from '@components/PostsAndProfile/TopNavigation/SettingsModal/SettingsMenuList/SettingsMenuItem';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  return (
    <InnerModal show={show} onCloseModal={onCloseModal}>
      <ModalContent>
        <SettingsMenuList>
          <SettingsMenuItem content={'편집하기'} onClick={() => navigate('edit')} />
        </SettingsMenuList>
      </ModalContent>
    </InnerModal>
  );
};

export default SettingsModal;

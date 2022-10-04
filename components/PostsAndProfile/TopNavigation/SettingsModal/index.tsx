import React, { FC } from 'react';
import styled from '@emotion/styled';
import SettingsMenuList from '@components/PostsAndProfile/TopNavigation/SettingsModal/SettingsMenuList';
import SettingsMenuItem from '@components/PostsAndProfile/TopNavigation/SettingsModal/SettingsMenuList/SettingsMenuItem';
import { useNavigate } from 'react-router-dom';
import FullScreenModal from '@components/common/modals/FullScreenModal';
import MenuList from '@components/common/lists/MenuList';
import MenuItem from '@components/common/lists/MenuList/MenuItem';
import { BiEditAlt } from 'react-icons/bi';
interface IProps {
  show: boolean;
  onCloseModal: () => void;
}

export const ModalContent = styled.div`
  position: absolute;
  width: 200px;
  border-radius: 4px;
  top: 60px;
  left: 300px;
  background-color: #fff;
`;

const SettingsModal: FC<IProps> = ({ show, onCloseModal }) => {
  const navigate = useNavigate();
  return (
    <FullScreenModal show={show} onCloseModal={onCloseModal}>
      <ModalContent>
        <MenuList>
          <MenuItem icon={<BiEditAlt />} content={'편집하기'} onClick={() => navigate('edit')} />
        </MenuList>
      </ModalContent>
    </FullScreenModal>
  );
};

export default SettingsModal;

import React, { FC } from 'react';
import InnerModal from '@components/common/modals/InnerModal';
import styled from '@emotion/styled';
import FullScreenModal from '@components/common/modals/FullScreenModal';
import MenuList from '@components/common/lists/MenuList';
import MenuItem from '@components/common/lists/MenuList/MenuItem';
import { MdOutlineCreate, MdOutlineBookmarkAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

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

const NewMenu: FC<IProps> = ({ show, onCloseModal }) => {
  const navigate = useNavigate();
  return (
    <FullScreenModal show={show} onCloseModal={onCloseModal}>
      <ModalContent>
        <MenuList>
          <MenuItem icon={<MdOutlineCreate />} content={'게시물 만들기'} onClick={() => navigate('/posts/new')} />
          <MenuItem
            icon={<MdOutlineBookmarkAdd />}
            content={'마이핑스 만들기'}
            onClick={() => navigate('/mypings/new')}
          />
        </MenuList>
      </ModalContent>
    </FullScreenModal>
  );
};

export default NewMenu;

import React from 'react';
import { useCallback } from 'react';
import FullScreenModal from '@components/common/modals/FullScreenModal';
import MenuItem from '@components/common/lists/MenuList/MenuItem';
import MenuList from '@components/common/lists/MenuList';
import styled from '@emotion/styled';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLogout } from 'react-icons/hi';

interface IProps {
  show: boolean;
  onCloseModal: () => void;
}

export const ModalContent = styled.div`
  position: absolute;
  bottom: 30px;
  left: 60px;
  width: 180px;
  background-color: #fff;
`;
const UserMenu = ({ show, onCloseModal }: IProps) => {
  const navigate = useNavigate();
  const onLogout = useCallback(() => {
    axios.get("/auth/logout", {withCredentials: true})
      .then((res ) => console.log(res.data))
      .catch(err => console.error(err))
  }, []);

  return (
    <FullScreenModal show={show} onCloseModal={onCloseModal}>
      <ModalContent>
        <MenuList>
          <MenuItem icon={<HiOutlineLogout />} content={'로그아웃'} onClick={onLogout} />
        </MenuList>
      </ModalContent>
    </FullScreenModal>
  );
};

export default UserMenu;

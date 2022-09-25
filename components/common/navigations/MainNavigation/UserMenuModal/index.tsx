import React from 'react';
import { useCallback } from 'react';
import FullScreenModal from '@components/common/modals/FullScreenModal';
import MenuItem from '@components/common/lists/MenuList/MenuItem';
import MenuList from '@components/common/lists/MenuList';
import styled from '@emotion/styled';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

interface IProps {
  show: boolean;
  onCloseModal: () => void;
}

export const ModalContent = styled.div`
  position: absolute;
  bottom: 30px;
  left: 56px;
  width: 180px;
`;
const UserMenu = ({ show, onCloseModal }: IProps) => {
  const navigate = useNavigate();
  const { data: userData, mutate } = useSWR('/users/me', fetcher);
  const onLogout = useCallback(() => {
    axios
      .post('/users/logout')
      .then((res) => {
        mutate();
        backToSignIn();
      })
      .then((err) => console.log(err));
  }, []);

  const backToSignIn = useCallback(() => {
    navigate('/sign_in');
    onCloseModal();
  }, []);

  return (
    <FullScreenModal show={show} onCloseModal={onCloseModal}>
      <ModalContent>
        <MenuList>
          {userData ? (
            <MenuItem content={'로그아웃'} onClick={onLogout} />
          ) : (
            <MenuItem content={'로그인'} onClick={backToSignIn} />
          )}
        </MenuList>
      </ModalContent>
    </FullScreenModal>
  );
};

export default UserMenu;

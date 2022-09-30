import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import ActionItem from './ActionItem';
import { BiBell } from 'react-icons/bi';
import { BiSearch } from 'react-icons/bi';
import { MdOutlineCreate } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import SearchFormModal from '@components/common/navigations/TopNavigation/SearchFormModal';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import NewMenu from '@components/common/navigations/TopNavigation/NewMenu';

interface IProps {
  title: string;
}

export const Header = styled.header`
  position: fixed;
  top: 0;
  width: 440px;
  height: 73px;
  border-bottom: 1px solid #dfdfdf;
  padding: 0 10px 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & h1 {
    font-size: 18px;
    font-weight: 700;
  }
`;

export const ActionItemList = styled.div`
  display: flex;

  & button:not(:first-of-type) {
    margin-left: 5px;
  }
`;

const TopNavigation = ({ title }: IProps) => {
  const navigate = useNavigate();
  const [showModals, setShowModals] = useState<{ [key: string]: boolean }>({
    showSearchFormModal: false,
    showNewMenu: false,
  });
  const handleModal = useCallback((modalName: string) => {
    setShowModals((p) => ({ ...p, [modalName]: !p[modalName] }));
  }, []);

  return (
    <>
      <Header>
        <h1>{title}</h1>
        <ActionItemList>
          <ActionItem icon={<BiSearch />} onClick={() => handleModal('showSearchFormModal')} />
          <ActionItem icon={<HiOutlineViewGridAdd />} onClick={() => handleModal('showNewMenu')} />
          <ActionItem icon={<BiBell />} onClick={() => console.log('clicked')} />
        </ActionItemList>
      </Header>
      <SearchFormModal show={showModals.showSearchFormModal} onCloseModal={() => handleModal('showSearchFormModal')} />
      <NewMenu show={showModals.showNewMenu} onCloseModal={() => handleModal('showNewMenu')} />
    </>
  );
};

export default TopNavigation;

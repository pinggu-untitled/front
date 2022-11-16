import { ActionButton, ActionList, Header } from '@components/headers/PageMainHeader/style';
import { useReducer } from 'react';
import Modal from '@components/Modal';
import MenuList from '@components/Layout/MenuList';
import { IMenuItem } from '@components/Layout/MenuList/MenuItem';
import { useNavigate } from 'react-router-dom';
import { SlArrowLeft } from 'react-icons/sl';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';

interface IProps {
  menuItems?: IMenuItem[];
}

interface IModals {
  [key: string]: boolean;
}

const PagePrevHeader = ({ menuItems }: IProps) => {
  const navigate = useNavigate();

  const [showModals, toggleModals] = useReducer(
    (prev: IModals, modalName: string) => ({ ...prev, [modalName]: !prev[modalName] }),
    { menu: false },
  );

  return (
    <Header>
      <ActionButton onClick={() => navigate(-1)}>
        <SlArrowLeft style={{ fontSize: '18px' }} />
      </ActionButton>
      {menuItems && (
        <ActionList>
          <ActionButton onClick={() => toggleModals('menu')}>
            <IoEllipsisVerticalSharp />
          </ActionButton>
          <Modal show={showModals.menu} onCloseModal={() => toggleModals('menu')}>
            <MenuList items={menuItems} style={{ top: '58px', left: '340px' }} />
          </Modal>
        </ActionList>
      )}
    </Header>
  );
};

export default PagePrevHeader;

import { ActionButton, ActionList, Header } from '@components/headers/PageMainHeader/style';
import { CSSProperties, ReactNode, useReducer } from 'react';
import Modal from '@components/Modal';
import MenuList from '@components/Layout/MenuList';
import { IMenuItem } from '@components/Layout/MenuList/MenuItem';
import { useNavigate } from 'react-router-dom';
import { SlArrowLeft } from 'react-icons/sl';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';

interface IProps {
  title: ReactNode | string;
  menuItems?: IMenuItem[];
  style?: CSSProperties;
}

interface IModals {
  [key: string]: boolean;
}

const PageTitleHeader = ({ title, menuItems, style }: IProps) => {
  const navigate = useNavigate();

  const [showModals, toggleModals] = useReducer(
    (prev: IModals, modalName: string) => ({ ...prev, [modalName]: !prev[modalName] }),
    { menu: false },
  );

  return (
    <Header style={style}>
      <ActionButton onClick={() => navigate(-1)}>
        <SlArrowLeft style={{ fontSize: '18px' }} />
      </ActionButton>
      <h2
        style={
          menuItems ? undefined : { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
        }
      >
        {title}
      </h2>
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

export default PageTitleHeader;

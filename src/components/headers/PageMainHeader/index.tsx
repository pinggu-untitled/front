import { ActionButton, ActionList, Header } from '@components/headers/PageMainHeader/style';
import { FiGrid, FiLogIn } from 'react-icons/fi';
import { TbBell } from 'react-icons/tb';
import { RiUser3Line } from 'react-icons/ri';
import { IoSearch } from 'react-icons/io5';
import { useReducer } from 'react';
import Modal from '@components/Modal';
import MenuList from '@components/Layout/MenuList';
import { IMenuItem } from '@components/Layout/MenuList/MenuItem';
import { BiPencil } from 'react-icons/bi';
import { MdOutlineBookmarkAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@contexts/SessionContext';

interface IProps {
  pageName: string;
}
interface IModals {
  [key: string]: boolean;
}
const PageHeader = ({ pageName }: IProps) => {
  const navigate = useNavigate();
  const { session } = useSession();
  const [showModals, toggleModals] = useReducer(
    (prev: IModals, modalName: string) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }),
    { menu: false },
  );
  const items: IMenuItem[] = [
    {
      icon: <BiPencil />,
      title: '게시물 만들기',
      onClick: () => navigate('/posts/new'),
    },
    {
      icon: <MdOutlineBookmarkAdd />,
      title: '마이핑스 만들기',
      onClick: () => navigate('/mypings/new'),
    },
    {
      icon: <RiUser3Line />,
      title: '프로필 수정하기',
      onClick: () => navigate(`/${session?.id}/edit`),
    },
    {
      icon: <FiLogIn />,
      title: '로그아웃',
      href: 'http://localhost:8080/auth/logout',
    },
  ];

  return (
    <Header>
      <h2>{pageName}</h2>
      <ActionList>
        <ActionButton>
          <IoSearch />
        </ActionButton>
        <ActionButton onClick={() => toggleModals('menu')}>
          <FiGrid />
        </ActionButton>
        <ActionButton>
          <TbBell />
        </ActionButton>
        <Modal show={showModals.menu} onCloseModal={() => toggleModals('menu')}>
          <MenuList items={items} style={{ top: '58px', left: '340px' }} />
        </Modal>
      </ActionList>
    </Header>
  );
};

export default PageHeader;

import Modal from '@components/Modal';
import { useReducer } from 'react';
import { ProfileAvatar } from '@components/Layout/SideNavigation/ProfileButtonModal/style';
import { useSession } from '@contexts/SessionContext';
import MenuList from '@components/Layout/MenuList';
import { RiUser3Line } from 'react-icons/ri';
import { FiLogIn } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { IMenuItem } from '@components/Layout/MenuList/MenuItem';
import mediaPath from '@utils/mediaPath';

const ProfileButtonModal = () => {
  const navigate = useNavigate();
  const { session, setSession } = useSession();
  const [show, toggleShow] = useReducer((prev) => !prev, false);
  const items: IMenuItem[] = [
    {
      icon: <RiUser3Line />,
      title: '마이페이지',
      onClick: () => navigate(`/${session?.id}`),
    },
    {
      icon: <FiLogIn />,
      title: '로그아웃',
      href: 'http://localhost:8080/auth/logout',
    },
  ];

  if (!session) return <div>로딩중...</div>;
  return (
    <>
      <ProfileAvatar onClick={toggleShow}>
        <img src={mediaPath('profile', session?.profile_image_url)} alt={session?.nickname} />
      </ProfileAvatar>
      <Modal size={'full'} show={show} onCloseModal={toggleShow}>
        <MenuList items={items} onClick={toggleShow} style={{ bottom: '20px', left: '66px' }} />
      </Modal>
    </>
  );
};

export default ProfileButtonModal;

import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { MdExplore, MdOutlineExplore } from 'react-icons/md';
import { IoChatbubbles, IoChatbubblesOutline, IoEllipsisHorizontal } from 'react-icons/io5';
import { RiMapPinUserLine, RiMapPinUserFill } from 'react-icons/ri';
import { HiOutlineDotsHorizontal, HiUser, HiOutlineUser, HiOutlineUserGroup, HiUserGroup } from 'react-icons/hi';
import NavItem from './NavItem';
import { Link } from 'react-router-dom';
import UserMenuModal from '@components/common/navigations/MainNavigation/UserMenuModal';

const Base = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 63px;
  height: 100vh;
  border-right: 1px solid #dfdfdf;
`;

const Logo = styled.div`
  width: 100%;
  height: 73px;
  display: flex;
  justify-content: center;
  align-items: center;
  //font-size: 26px;
  cursor: pointer;
  border-bottom: 1px solid #dfdfdf;
`;

const NavList = styled.ul`
  width: 100%;
  height: 100%;
`;

export const UserProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #dfdfdf;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const MainNavigation = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const toggleModal = useCallback(() => {
    setShowUserMenu((p) => !p);
  }, []);
  return (
    <>
      <Base>
        <Logo>
          <Link to={'/'}>
            {/*<FaMapPin />*/}
            핑구
          </Link>
        </Logo>
        <NavList>
          <NavItem
            url={'/'}
            contents={{ icons: { filled: <AiFillHome />, outlined: <AiOutlineHome /> }, title: '홈' }}
          />
          <NavItem
            url={'/explore'}
            contents={{ icons: { filled: <MdExplore />, outlined: <MdOutlineExplore /> }, title: '탐색' }}
          />
          <NavItem
            url={'/mypings'}
            contents={{ icons: { filled: <RiMapPinUserFill />, outlined: <RiMapPinUserLine /> }, title: '마이핑스' }}
          />
          <NavItem
            url={'/chatrooms'}
            contents={{ icons: { filled: <IoChatbubbles />, outlined: <IoChatbubblesOutline /> }, title: '채팅' }}
          />
          <NavItem
            url={'/:nickname'}
            contents={{ icons: { filled: <HiUser />, outlined: <HiOutlineUser /> }, title: '마이페이지' }}
          />
          <NavItem
            url={'/more'}
            contents={{
              icons: { filled: <IoEllipsisHorizontal />, outlined: <HiOutlineDotsHorizontal /> },
              title: '더보기',
            }}
          />
        </NavList>
        <UserProfile onClick={toggleModal}>
          <img src={'/public/placeholder.png'} />
        </UserProfile>
      </Base>
      <UserMenuModal show={showUserMenu} onCloseModal={toggleModal} />
    </>
  );
};

export default MainNavigation;

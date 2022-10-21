import React, { useState } from 'react';
import styled from '@emotion/styled';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IMe } from '@typings/db';
import SettingsModal from '@components/revised/SettingsModal';
import { IoIosLogOut, IoIosLogIn } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import NavItemList from '@components/revised/common/navigations/SideNavigation/NavItemList';
import { AiFillHome, AiOutlineHome, AiOutlineCompass, AiOutlineUser, AiFillCompass } from 'react-icons/ai';
import {
  IoChatbubbleOutline,
  IoEllipsisHorizontalOutline,
  IoEllipsisHorizontalSharp,
  IoChatbubble,
} from 'react-icons/io5';
import ProfileAvatar from '@components/revised/common/images/ProfileAvatar';
import handleNavigate from '@utils/handleNavigate';
export const Base = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 68px;
  height: 100vh;
  border-right: 1px solid #dfdfdf;
  background-color: #fff;
  z-index: 3000;
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.div`
  height: 72px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
`;

const SideNavigation = () => {
  const navigate = useNavigate();
  const { data: md } = useSWR<IMe>(`/users/me`, fetcher);
  const [showModals, setShowModals] = useState<{ [key: string]: any }>({ showSettingsModal: false });
  const handleModal = (modalName: string) => () => {
    setShowModals((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
  };

  const loggedInUserItems = [
    {
      content: { icon: <AiOutlineUser />, title: '마이페이지' },
      onClick: handleNavigate(navigate, `/${md?.id}`),
    },
    {
      content: { icon: <IoIosLogOut />, title: '로그아웃', rest: <a href={'http://localhost:8080/auth/logout'}></a> },
      onClick: () => {
        handleModal('showSettingsModal')();
        handleNavigate(navigate, '/intro')();
      },
    },
  ];
  const notLoggedInUserItems = [
    {
      content: { icon: <IoIosLogIn />, title: '로그인' },
      onClick: handleNavigate(navigate, '/intro'),
    },
  ];

  const navItems = [
    { icon: { filled: <AiFillHome />, outlined: <AiOutlineHome /> }, title: '홈', path: `/` },
    { icon: { filled: <AiFillCompass />, outlined: <AiOutlineCompass /> }, title: '탐색', path: `/explore` },
    { icon: { filled: <IoChatbubble />, outlined: <IoChatbubbleOutline /> }, title: '채팅', path: '/chatrooms' },
    {
      icon: { filled: <AiOutlineUser style={{ fontWeight: '700' }} />, outlined: <AiOutlineUser /> },
      title: '마이페이지',
      path: `/${md?.id}`,
    },
    {
      icon: { filled: <IoEllipsisHorizontalSharp />, outlined: <IoEllipsisHorizontalOutline /> },
      title: '더보기',
      path: `/more`,
    },
  ];
  return (
    <>
      <Base>
        <Logo onClick={handleNavigate(navigate, '/')}>핑구</Logo>
        <NavItemList items={navItems} />
        <ProfileAvatar
          profile={md}
          style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translate(-50%)' }}
          onClick={handleModal('showSettingsModal')}
        />
      </Base>
      <SettingsModal
        show={showModals.showSettingsModal}
        onCloseModal={handleModal('showSettingsModal')}
        style={{ bottom: '20px', left: '60px' }}
        items={md ? loggedInUserItems : notLoggedInUserItems}
      />
    </>
  );
};

export default SideNavigation;

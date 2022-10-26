import React, { FC, useState, useCallback, useRef } from 'react';
import { useNavigate, Outlet, useParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { BiGrid } from 'react-icons/bi';
import { MdOutlineBookmarkBorder } from 'react-icons/md';
import DetailTopNavigation from '@components/revised/common/navigations/DetailTopNavigation';
import SettingsModal from '@components/revised/SettingsModal';
import { HiOutlineUsers } from 'react-icons/hi';
import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineDelete, AiOutlineLink } from 'react-icons/ai';
import ProfileBoard from '@components/revised/Profile/ProfileBoard';
import TapList from '@components/revised/Profile/TapList';
import TapItem from '../../components/revised/Profile/TapList/TapItem/index';
import { IMe, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import TopNavigation from '@components/revised/common/navigations/TopNavigation';
import { Base, MainContentZone } from '@pages/Home';
import useModals from '@utils/useModals';
import handleNavigate from '@utils/handleNavigate';

const Profile = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { userId } = useParams<{ userId: string }>();
  const { data: md, mutate: mutateMd } = useSWR<IMe>('/users/me', fetcher);
  const { data: ud, mutate: mutateUd } = useSWR<IUser>(`/users/${userId}`, fetcher);
  const copyUrlRef = useRef<HTMLTextAreaElement | null>(null);
  const [showModals, handleModal] = useModals('showSettingsModal', 'showEachTapSettingsModal');

  const copyUrl = useCallback((e: any) => {
    copyUrlRef.current?.select();
    document.execCommand('copy');
    e.target.focus();
  }, []);

  const userSettingItems = [
    { content: { icon: <BiEditAlt />, title: '편집하기' }, onClick: () => console.log('good') },
    { content: { icon: <AiOutlineDelete />, title: '삭제하기' }, onClick: () => console.log('good') },
  ];

  const viewerSettingItems = [
    {
      content: {
        icon: <AiOutlineLink />,
        title: '링크 복사',
        rest: (
          <form>
            <textarea ref={copyUrlRef} value={window.location.href} />
          </form>
        ),
      },
      onClick: copyUrl,
    },
  ];

  return (
    <Base>
      {md?.id === Number(userId) ? (
        <TopNavigation title={'마이페이지'} />
      ) : (
        <DetailTopNavigation prev="/" toggleOptions={handleModal('showSettingsModal')} />
      )}
      <SettingsModal
        show={showModals.showSettingsModal}
        onCloseModal={handleModal('showSettingsModal')}
        items={md?.id === ud?.id ? userSettingItems : viewerSettingItems}
        style={{ top: '60px', left: '310px' }}
      />

      <MainContentZone>
        {ud && <ProfileBoard profile={ud} />}
        <TapList count={3}>
          <TapItem
            icon={<BiGrid />}
            name={'게시물'}
            onClick={handleNavigate(navigate, `/${userId}`)}
            match={'/:userId'}
          />
          <TapItem
            icon={<MdOutlineBookmarkBorder />}
            name={'마이핑스'}
            onClick={handleNavigate(navigate, `/${userId}/mypings`)}
            match={'/:userId/mypings'}
          />
          <TapItem
            icon={<HiOutlineUsers />}
            name={'친구'}
            onClick={handleNavigate(navigate, `/${userId}/friends`)}
            match={'/:userId/friends'}
          />
        </TapList>
        <Outlet />
      </MainContentZone>
    </Base>
  );
};

export default Profile;

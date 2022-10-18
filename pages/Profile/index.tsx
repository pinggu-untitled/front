import React, { FC, useState, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import MainTopNavigation from '@components/common/navigations/TopNavigation';
import { useNavigate, Outlet, useParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { BiGrid } from 'react-icons/bi';
import { MdOutlineBookmarkBorder } from 'react-icons/md';
import { HiOutlineUsers } from 'react-icons/hi';
import DetailTopNavigation from '@components/revised/common/navigations/DetailTopNavigation';
import SettingsButton from '@components/revised/Profile/SettingsButton';
import SettingsModal from '@components/revised/SettingsModal';
import { BiEditAlt } from 'react-icons/bi';
import { FiScissors } from 'react-icons/fi';
import { AiOutlineDelete, AiOutlineLink } from 'react-icons/ai';
import ProfileBoard from '@components/revised/Profile/ProfileBoard';
import TapList from '@components/revised/Profile/TapList';
import TapItem from '../../components/revised/Profile/TapList/TapItem/index';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { IMe } from '../../typings/db';

export const Base = styled.div`
  width: 100%;
  height: 100%;
`;

export const MainContentZone = styled.div`
  width: 440px;
  top: 73px;
  position: absolute;
  bottom: 0;
`;

export const ProfileBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;

  & .nickname {
    font-size: 16px;
    font-weight: 700;
    margin-top: 10px;
  }

  & .bio {
    margin: 10px 0;
    font-size: 15px;
    color: gray;
    text-overflow: ellipsis;
    max-width: 330px;
    text-align: center;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  & svg {
    font-size: 18px;
    margin-right: 2px;
  }
`;

interface IForm {
  searchQueries: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { userId } = useParams<{ userId: string }>();
  const { data: md, mutate: mutateMd } = useSWR<IMe>('/users/me', fetcher);
  const { data: ud, mutate: mutateUd } = useSWR<IUser>(`/users/${userId}`, fetcher);
  const copyUrlRef = useRef<HTMLTextAreaElement | null>(null);
  const [following, setFollowing] = useState(false);
  const [showModals, setShowModals] = useState<{ [key: string]: boolean }>({
    showSettingsModal: false,
    showEachTapSettingsModal: false,
  });

  const handleModal = useCallback(
    (modalName: string) => () => {
      setShowModals((pv) => ({ ...pv, [modalName]: !pv[modalName] }));
    },
    [],
  );

  const copyUrl = useCallback((e: any) => {
    copyUrlRef.current?.select();
    document.execCommand('copy');
    e.target.focus();
  }, []);

  const userSettingItems = [
    { content: { icon: <BiEditAlt />, title: '편집하기' }, onClick: () => console.log('good') },
    { content: { icon: <AiOutlineDelete />, title: '삭제하기' }, onClick: () => console.log('good') },
  ];

  // const eachTapSettingsItems = [
  //   { content: { icon: <FiScissors />, title: '수정하기' }, onClick: () => console.log('good') },
  // ];
  const viewerSettingItems = [
    {
      content: {
        icon: <AiOutlineLink />,
        title: '링크 복사',
        children: (
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
      {/* {ud?.id === targetUd?.id ? (
        <MainTopNavigation title={'마이페이지'} />
      ) : ( */}
      <DetailTopNavigation prev="/" toggleOptions={handleModal('showSettingsModal')} />
      {/* )} */}
      <SettingsModal
        show={showModals.showSettingsModal}
        onCloseModal={handleModal('showSettingsModal')}
        items={md?.id === ud?.id ? userSettingItems : viewerSettingItems}
        style={{ top: '60px', left: '310px' }}
      />

      <MainContentZone>
        {ud && <ProfileBoard profile={ud} />}
        <TapList count={3}>
          <TapItem icon={<BiGrid />} name={'게시물'} url={`/${userId}`} match={'/:userId'} />
          <TapItem
            icon={<MdOutlineBookmarkBorder />}
            name={'마이핑스'}
            url={`/${userId}/mypings`}
            match={'/:userId/mypings'}
          />
          <TapItem icon={<HiOutlineUsers />} name={'친구'} url={`/${userId}/friends`} match={'/:userId/friends'} />
        </TapList>

        <Outlet />
      </MainContentZone>
    </Base>
  );
};

export default Profile;

import React, { FC, useState, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import MainTopNavigation from '@components/common/navigations/TopNavigation';
import { useNavigate, Outlet } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import ProfileActionButtons from '@components/common/profiles-related/ProfileBox/ProfileActionButtons';
import ProfileBox from '@components/common/profiles-related/ProfileBox';
import MatchActionButton from '@components/common/profiles-related/ProfileBox/ProfileActionButtons/NestedButton';
import ProfileImageWrapper from '@components/common/profiles-related/ProfileImageWrapper';
import FollowButton from '@components/common/profiles-related/ProfileBox/FollowButton';
import NestedButton from '@components/common/profiles-related/ProfileBox/ProfileActionButtons/NestedButton';
import { BiGrid } from 'react-icons/bi';
import { MdOutlineBookmarkBorder } from 'react-icons/md';
import { HiOutlineUsers } from 'react-icons/hi';
import DetailTopNavigation from '@components/revised/common/navigations/DetailTopNavigation';
import SettingsModal from '@components/revised/SettingsModal';

import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineDelete, AiOutlineLink } from 'react-icons/ai';
import ProfileBoard from '@components/revised/Profile/ProfileBoard';

export const Base = styled.div`
  width: 100%;
  height: 100vh;
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
  const userData = false;
  const copyUrlRef = useRef<HTMLTextAreaElement | null>(null);
  const [following, setFollowing] = useState(false);
  const [showModals, setShowModals] = useState<{ [key: string]: boolean }>({ showSettingsModal: false });

  const handleModal = useCallback((modalName: string) => {
    setShowModals((pv) => ({ ...pv, [modalName]: !pv[modalName] }));
  }, []);

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

  const ud = { id: 1, nickname: '아무개', profile_image_url: '/public/1.png', bio: '🎃🤖 Holloween 할로윈' };

  return (
    <Base>
      {/* {userData ? <MainTopNavigation title={'마이페이지'} /> : <DetailTopNavigation onClick={() => navigate('/')} />} */}
      <DetailTopNavigation toggleOptions={() => handleModal('showSettingsModal')} />
      <SettingsModal
        show={showModals.showSettingsModal}
        onCloseModal={() => handleModal('showSettingsModal')}
        items={userSettingItems || viewerSettingItems}
        style={{ top: '60px', left: '310px' }}
      />
      <MainContentZone>
        <ProfileBoard profile={ud} />

        {/* <ProfileBox>
          <ProfileActionButtons>
            <NestedButton icon={<BiGrid />} title={'게시물'} url={'/nickname'} match={'/:nickname'} />
            <NestedButton
              icon={<MdOutlineBookmarkBorder />}
              title={'마이핑스'}
              url={'/nickname/mypings'}
              match={'/:nickname/mypings'}
            />
            <NestedButton
              icon={<HiOutlineUsers />}
              title={'친구'}
              url={'/nickname/friends'}
              match={'/:nickname/friends'}
            />
          </ProfileActionButtons>
        </ProfileBox> */}
        <Outlet />
      </MainContentZone>
    </Base>
  );
};

export default Profile;

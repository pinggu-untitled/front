import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import MainTopNavigation from '@components/common/navigations/TopNavigation';
import DetailTopNavigation from '@components/common/navigations/DetailTopNavigation';
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

export const Base = styled.div`
  width: 100%;
  height: 100vh;
`;

export const MainContentZone = styled.div`
  padding-top: 73px;
  width: 440px;
  top: 73px;
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
  const [following, setFollowing] = useState(false);

  return (
    <Base>
      {/* 로그인 사용자와 프로필 닉네임이 동일하면 */}
      {userData ? <MainTopNavigation title={'마이페이지'} /> : <DetailTopNavigation onClick={() => navigate('/')} />}
      <MainContentZone>
        <ProfileBox>
          <ProfileBar>
            <ProfileImageWrapper
              src={'/public/placeholder.png'}
              nickname={'nickname'}
              style={{ width: '100px', height: '100px' }}
            />
            <span className={'nickname'}>{'사용자 닉네임'}</span>
            <p className={'bio'}>{'안녕하세요 반갑습니당!!!! 제 프로필 페이지에여 빠이염'}</p>
            {/* 로그인 사용자와 프로필 닉네임이 다르면*/}
            {userData && <FollowButton isClicked={following} onClick={() => setFollowing((p) => !p)} />}
          </ProfileBar>
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
        </ProfileBox>
        <Outlet />
      </MainContentZone>
    </Base>
  );
};

export default Profile;

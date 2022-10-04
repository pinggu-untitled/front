import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import MainTopNavigation from '@components/common/navigations/TopNavigation';
import TopNavigation from '@components/PostsAndProfile/TopNavigation';
import { useNavigate, Outlet } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import ActionButtonList from '@components/PostsAndProfile/ProfileBox/ActionButtonList';
import ProfileBox from '@components/PostsAndProfile/ProfileBox';
import MatchActionButton from '@components/PostsAndProfile/ProfileBox/ActionButtonList/MatchActionButton';
import ProfileImageWrapper from '@components/common/profiles-related/ProfileImageWrapper';
import FollowButton from '@components/PostsAndProfile/ProfileBox/FollowButton';
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
      {userData ? <MainTopNavigation title={'마이페이지'} /> : <TopNavigation onClick={() => navigate('/')} />}
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
          <ActionButtonList>
            <MatchActionButton
              content={
                <ContentWrapper>
                  <BiGrid />
                  게시물
                </ContentWrapper>
              }
              url={'/nickname'}
              match={'/:nickname'}
            />
            <MatchActionButton
              content={
                <ContentWrapper>
                  <MdOutlineBookmarkBorder />
                  마이핑스
                </ContentWrapper>
              }
              url={'/nickname/mypings'}
              match={'/:nickname/mypings'}
            />
            <MatchActionButton
              content={
                <ContentWrapper>
                  <HiOutlineUsers />
                  친구
                </ContentWrapper>
              }
              url={'/nickname/friends'}
              match={'/:nickname/friends'}
            />
          </ActionButtonList>
        </ProfileBox>
        <Outlet />
      </MainContentZone>
    </Base>
  );
};

export default Profile;

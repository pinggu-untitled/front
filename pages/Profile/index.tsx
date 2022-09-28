import React, { FC } from 'react';
import styled from '@emotion/styled';
import MainTopNavigation from '@components/common/navigations/TopNavigation';
import TopNavigation from '@components/PostsAndProfile/TopNavigation';
import { Route, Router, Routes, useNavigate, Outlet } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import ActionButtonList from '@components/PostsAndProfile/ProfileBox/ActionButtonList';
import ActionButton from '@components/PostsAndProfile/ProfileBox/ActionButtonList/ActionButton';
import ProfileBox from '@components/PostsAndProfile/ProfileBox';
import MatchActionButton from '@components/PostsAndProfile/ProfileBox/ActionButtonList/MatchActionButton';

export const Base = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
`;

export const MainContentZone = styled.div`
  padding-top: 73px;
  width: 440px;
  top: 73px;
  bottom: 0;
`;

export const ProfileImageWrapper = styled.div`
  width: 100%;
  height: 110px;
  border-bottom: 1px solid #dfdfdf;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 28px 0 20px 0;

  & .nickname {
    font-size: 15px;
    font-weight: 700;
    margin-top: 5px;
  }

  & .bio {
    margin-top: 10px;
    font-size: 14px;
    color: gray;
    text-overflow: ellipsis;
    max-width: 300px;
    text-align: center;
  }
`;

export const ProfileImageButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #dfdfdf;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -25px;
  overflow: hidden;
  background-color: #fff;
  cursor: pointer;

  & img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

export const NestedPageZone = styled.div``;

interface IForm {
  searchQueries: string;
}
const Profile = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const userData = true; // 로그인 사용자와 닉네임이 동일하면
  return (
    <Base>
      {userData ? <MainTopNavigation title={'마이페이지'} /> : <TopNavigation onClick={() => navigate('/')} />}
      <MainContentZone>
        <ProfileImageWrapper>
          <img src={'/public/placeholder.png'} />
        </ProfileImageWrapper>
        <ProfileBox>
          <ProfileImageButton onClick={() => navigate(`/nickname`)}>
            <img src={'/public/placeholder.png'} />
          </ProfileImageButton>
          <InfoWrapper className={'info'}>
            <span className={'nickname'}>{'사용자 닉네임'}</span>
            <p className={'bio'}>{'안녕하세요 반갑습니당!!!! 제 프로필 페이지에여 빠이염'}</p>
          </InfoWrapper>
          <ActionButtonList>
            <MatchActionButton content={'게시물'} url={'/nickname'} match={'/:nickname'} />
            <MatchActionButton content={'마이핑스'} url={'/nickname/mypings'} match={'/:nickname/mypings'} />
            <MatchActionButton content={'친구'} url={'/nickname/friends'} match={'/:nickname/friends'} />
          </ActionButtonList>
        </ProfileBox>
        <NestedPageZone>
          <Outlet />
        </NestedPageZone>
      </MainContentZone>
    </Base>
  );
};

export default Profile;

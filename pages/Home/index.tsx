import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import TopNavigation from '@components/common/navigations/TopNavigation';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IPostCard } from '../../typings/db';
import CardList from '@components/revised/CardList';
import PostCard from '@components/revised/CardList/PostCard';
import ProfileCard from '@components/revised/CardList/ProfileCard';
import MyPingsCard from '@components/revised/CardList/MyPingsCard';
import { v4 as uuid } from 'uuid';
export const Base = styled.div`
  width: 100%;
  height: 100%;
`;

export const MainContentZone = styled.div`
  position: absolute;
  width: 440px;
  top: 73px;
  bottom: 0;
  overflow: scroll;
`;

interface IForm {
  searchQueries: string;
}
const Home = () => {
  const { data: pd, mutate: mutatePd } = useSWR<IPostCard[] | null>(`/posts/all`, fetcher);

  return (
    <Base>
      <TopNavigation title={'홈'} />
      <MainContentZone>
        <CardList>
          {pd?.slice(0, 3).map((post) => (
            <ProfileCard key={uuid()} profile={post.User} />
          ))}

          {pd?.slice(0, 3).map((post) => (
            <MyPingsCard key={uuid()} mypings={post} />
          ))}
          {pd?.slice(0, 10).map((post) => (
            <PostCard key={uuid()} post={post} />
          ))}
        </CardList>
      </MainContentZone>
    </Base>
  );
};

export default Home;

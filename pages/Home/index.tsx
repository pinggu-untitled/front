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

export const Base = styled.div`
  width: 100%;
  height: 100%;
`;

export const MainContentZone = styled.div`
  position: absolute;
  width: 440px;
  top: 73px;
  bottom: 0;
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
          {pd?.slice(0, 3).map((post, i) => (
            <ProfileCard profile={post.User} />
          ))}
          {pd?.slice(0, 10).map((post, i) => (
            <PostCard key={`posts/${post.id}}`} post={post} />
          ))}
        </CardList>
      </MainContentZone>
    </Base>
  );
};

export default Home;

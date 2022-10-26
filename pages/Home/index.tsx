import React, { useEffect, useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IMe, IPost } from '@typings/db';
import CardList from '@components/revised/CardList';
import PostCard from '@components/revised/Home/PostCard';
import { v4 as uuid } from 'uuid';
import TopNavigation from '@components/revised/common/navigations/TopNavigation';
import { redirect, useNavigate, useLocation } from 'react-router-dom';
import readable from '@utils/readable';
import { Redirect } from 'react-router';
import { useMap } from '@contexts/MapContext';

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
  const navigator = useNavigate();
  const { data: md } = useSWR<IMe>('/users/me', fetcher);
  const { data: pd } = useSWR<IPost[]>('/posts', fetcher);
  const { moveCenterToMe } = useMap();
  const { search } = useLocation();
  const isMyPost = (post: IPost) => post.User.id === md?.id;

  useLayoutEffect(() => {
    if (search) moveCenterToMe();
  }, []);

  useEffect(() => {
    if (md === undefined && pd === undefined) navigator('/');
  }, [md, pd]);

  return (
    <Base>
      <TopNavigation title={'홈'} />
      <MainContentZone>
        {md && pd && (
          <CardList>
            {readable(md)(pd)?.map((post) => (
              <PostCard key={uuid()} post={post} isMine={isMyPost(post)} />
            ))}
          </CardList>
        )}
      </MainContentZone>
    </Base>
  );
};

export default Home;

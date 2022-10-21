import React from 'react';
import styled from '@emotion/styled';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IMe, IPost } from '@typings/db';
import CardList from '@components/revised/CardList';
import PostCard from '@components/revised/Home/PostCard';
import { v4 as uuid } from 'uuid';
import TopNavigation from '@components/revised/common/navigations/TopNavigation';
import { useNavigate } from 'react-router-dom';
import readable from '@utils/readable';

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
  const navigate = useNavigate();
  const { data: md, mutate: mutateMd } = useSWR<IMe>(`/users/me`, fetcher);
  const { data: pd, mutate: mutatePd } = useSWR<IPost[]>(`/posts`, fetcher);

  if (md === undefined) navigate('/intro');

  const isMyPost = (post: IPost) => {
    return post.User.id === md?.id;
  };
  const publicOnly = (posts: IPost[]): IPost[] =>
    posts.filter((post) => [0, false].includes(post.is_private) || isMyPost(post));

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

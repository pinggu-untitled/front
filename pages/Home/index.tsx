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
  const navigate = useNavigate();
  const { data: md, mutate: mutateMd } = useSWR<IMe>(`/users/me`, fetcher);
  const { data: pd, mutate: mutatePd } = useSWR<IPost[]>(`/posts`, fetcher);

  if (!md) navigate('/intro');
  if (!pd) return <div>로딩중...</div>;
  return (
    <Base>
      <TopNavigation title={'홈'} />
      <MainContentZone>
        {pd && (
          <CardList>
            {pd?.map((post) => (
              <PostCard key={uuid()} post={post} />
            ))}
          </CardList>
        )}
      </MainContentZone>
    </Base>
  );
};

export default Home;

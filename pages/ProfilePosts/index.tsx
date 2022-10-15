import React from 'react';
import styled from '@emotion/styled';
import AddButton from '@components/Profile/AddButton';
import PostCard from '@components/revised/Profile/PostCard';
import { IPostCard } from '@typings/db';
// import PreviewCard from '../../components/Profile/PreviewCard';
import CardList from '@components/revised/CardList';
import Profile from '../Profile/index';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
export const Base = styled.div`
  width: 100%;
  height: 100%;
`;

const ProfilePosts = () => {
  const { data: pd, mutate: mutatePd } = useSWR<IPostCard[] | null>(`/posts/all`, fetcher);

  return (
    <Base>
      <CardList>
        {pd?.slice(0, 10).map((post, i) => (
          <PostCard key={i} post={post} />
        ))}
      </CardList>
      <AddButton to={'/posts/new'} />
    </Base>
  );
};

export default ProfilePosts;

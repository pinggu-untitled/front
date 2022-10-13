import React from 'react';
import styled from '@emotion/styled';
import AddButton from '@components/Profile/AddButton';
import PostCard from '@components/PostCard';
import { IPostCard } from '@typings/db';
import PreviewCard from '../../components/Profile/PreviewCard';
export const Base = styled.div`
  width: 100%;
`;

const ProfilePosts = () => {
  const dummies: IPostCard[] = [
    {
      id: 1,
      title: '안녕',
      content: '졸려',
      is_private: false,
      hits: 1,
      latitude: '111.23123',
      longitude: '111.23123',
      updated_at: '12',
      created_at: '134',
      User: { id: 1, nickname: 'good', profile_image_url: 'xxx' },
      Images: { id: 2, src: 'dfdf' },
    },
  ];
  return (
    <Base>
      <ul>
        {dummies.map((post, i) => (
          <PreviewCard key={i} data={post} />
        ))}
      </ul>
      <AddButton to={'/posts/new'} />
    </Base>
  );
};

export default ProfilePosts;

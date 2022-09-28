import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import TopNavigation from '@components/common/navigations/TopNavigation';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

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

export const PostCards = styled.ul``;
export const PostCard = styled.li`
  width: 100%;
  height: 100px;
  border: 1px solid #dfdfdf;
  background-color: rgba(0, 0, 0, 0.05);
  > a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface IForm {
  searchQueries: string;
}
const Home = () => {
  const { control, handleSubmit } = useForm<IForm>({
    defaultValues: { searchQueries: '' },
  });
  const onSubmit = useCallback((data: IForm) => {
    console.log(data);
  }, []);

  const posts: any[] = [
    {
      id: 1,
      title: '맛집',
    },
    {
      id: 2,
      title: '개노맛집',
    },
  ];

  const clickHandler = useCallback((content: string) => {
    console.log(content);
  }, []);

  return (
    <Base>
      <TopNavigation title={'홈'} />
      <MainContentZone>
        <PostCards>
          {posts.map((post) => (
            <PostCard key={post.id}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </PostCard>
          ))}
        </PostCards>
      </MainContentZone>
    </Base>
  );
};

export default Home;

import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import TopNavigation from '@components/common/navigations/TopNavigation';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Scrollbars } from 'react-custom-scrollbars-2';
import PostCard from '@components/PostCard';
import { IPostCard } from '../../typings/db';

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

interface IForm {
  searchQueries: string;
}
const Home = () => {
  const { data: pd, mutate: mutatePd } = useSWR<IPostCard[] | null>(`/posts/all`, fetcher);

  const { control, handleSubmit } = useForm<IForm>({
    defaultValues: { searchQueries: '' },
  });
  const onSubmit = useCallback((data: IForm) => {
    console.log(data);
  }, []);

  return (
    <Base>
      <TopNavigation title={'홈'} />
      <MainContentZone>
        <PostCards>
          <Scrollbars universal={true}>
            {pd
              ?.slice(0, 100)
              ?.filter((post: any) => post.is_private === 0)
              .map((post) => (
                <PostCard key={post.id} data={post} />
              ))}
          </Scrollbars>
        </PostCards>
      </MainContentZone>
    </Base>
  );
};

export default Home;

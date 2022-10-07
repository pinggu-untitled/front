import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import TopNavigation from '@components/common/navigations/TopNavigation';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Scrollbars } from 'react-custom-scrollbars-2';

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
  const { data: pd, mutate: mutatePd } = useSWR(`/posts/all`, fetcher);

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
              ?.filter((post: any) => post.is_private === 0)
              .map((post: any) => (
                <PostCard key={post.id}>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </PostCard>
              ))}
          </Scrollbars>
        </PostCards>
      </MainContentZone>
    </Base>
  );
};

export default Home;

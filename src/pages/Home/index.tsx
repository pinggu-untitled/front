import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import PageHeader from '@components/headers/PageMainHeader';
import fetcher from '@utils/fetcher';
import { PageMain } from './style';
import PostCard from '@components/Home/PostCard';
import { IPost } from '@typings/db';
import CardList from '@components/Home/CardList';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useCallback, useEffect, useRef } from 'react';
import Scrolling from '@components/Home/Scrolling';

// get /posts?size=x&page=y

// return {
//   contents: IPost[],
//   pageNumber: number,
//   pageSize: number,
//   totalPages: number,
//   totalCount: number,
//   isLastPage: boolean,
//   isFirstPage: boolean
// }

interface IInfinite {
  contents: IPost[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
  isFirstPage: boolean;
}

const Home = () => {
  const { data, setSize } = useSWRInfinite<IPost[]>((index) => `/posts?size=20&page=${index + 1}`, fetcher);
  const isEmpty = data?.[0].length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 20) || false;

  return (
    <>
      <PageHeader pageName={'홈'} />
      <PageMain>
        <Scrolling setSize={setSize} isEmpty={isEmpty} isReachingEnd={isReachingEnd}>
          {data?.map((posts, index) => {
            return posts.map((post) => <PostCard key={post.id} data={post} />);
          })}
        </Scrolling>
      </PageMain>
    </>
  );
};

export default Home;

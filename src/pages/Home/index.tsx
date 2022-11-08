import PageHeader from '@components/headers/PageMainHeader';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { PageMain } from './style';
import PostCard from '@components/Home/PostCard';
import { IPost } from '@typings/db';
import CardList from '@components/Home/CardList';

const Home = () => {
  const { data: posts } = useSWR<IPost[]>('/posts', fetcher);
  return (
    <>
      <PageHeader pageName={'홈'} />
      <PageMain>
        <CardList>
          {posts?.map((post) => (
            <PostCard key={post.id} data={post} />
          ))}
        </CardList>
      </PageMain>
    </>
  );
};

export default Home;

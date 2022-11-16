import PageHeader from "@components/headers/PageMainHeader";
import fetcher from "@utils/fetcher";
import { PageMain } from "./style";
import PostCard from "@components/Home/PostCard";
import { IPost } from "@typings/db";
import CardList from "@components/Home/CardList";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";
import { useEffect } from "react";

const Home = () => {
  const getKey = (pageIndex: number, previousPageData: IPost[]) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/posts?size=20&page=${pageIndex + 1}`;
  };

  const { data: Posts, setSize } = useSWRInfinite<IPost[]>(getKey, fetcher);
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) {
      setSize(pageIndex => pageIndex + 1);
    }
  }, [inView]);

  console.log(Posts);
  return (
    <>
      <PageHeader pageName={"홈"} />
      <PageMain>
        <CardList>
          {Posts?.map((posts, i) => {
            return posts?.map((post, j) => {
              if (i === Posts.length - 1 && j === 1) return posts?.map((post) => <PostCard key={post.id} data={post}
                                                                                           ref={ref} />);
              return <PostCard key={post.id} data={post} />;
            });
          })}
        </CardList>
      </PageMain>
    </>
  );
};

export default Home;

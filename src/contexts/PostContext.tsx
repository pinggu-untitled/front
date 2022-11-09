import { createContext, useCallback, useContext } from 'react';
import { IPost } from '@typings/db';
import { IProvider } from '@contexts/SessionContext';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router-dom';
import axios from 'axios';

type Post = IPost | null;
interface IContext {
  Post: Post;
  onFetch: (postId: number) => () => any;
  onEdit: (postId: number) => () => void;
  onDelete: (postId: number) => () => void;
}

const PostContext = createContext<IContext | any>({});
const PostProvider = ({ children }: IProvider) => {
  const id = useParams<{ postId: string }>();
  const { data: Post, mutate } = useSWR(id ? `/posts/${id}` : null, fetcher);
  const onFetch = useCallback(
    (postId: number) => () => {
      const { data, mutate } = useSWR(id ? `/posts/${postId}` : null, fetcher);
      return { data, mutate };
    },
    [],
  );

  const onEdit = useCallback(
    (postId: number) => () => {
      axios.patch(`/posts/${postId}`).then((res) => {
        console.log(res.data);
        // mutate();
      });
    },
    [],
  );

  const onDelete = useCallback(
    (postId: number) => () => {
      axios.delete(`/posts/${postId}`).then((res) => {
        console.log(res.data);
        // mutate();
      });
    },
    [],
  );

  return <PostContext.Provider value={{ onFetch, onEdit, onDelete }}>{children}</PostContext.Provider>;
};

export const usePost = (): IContext => useContext(PostContext);
export default PostProvider;

import { createContext, useCallback, useContext } from 'react';
import { IUserPost } from '@typings/db';
import { IProvider } from '@contexts/SessionContext';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface IContext {
  Posts: IUserPost[];
  onEdit: (postId: number) => () => void;
  onDelete: (postId: number) => () => void;
}

const ProfilePostsContext = createContext<IContext | any>({});
const ProfilePostsProvider = ({ children }: IProvider) => {
  const { userId } = useParams<{ userId: string }>();
  const { data: Posts, mutate } = useSWR<IUserPost[]>(userId ? `/users/${userId}/posts` : null, fetcher);
  const onEdit = useCallback(
    (postId: number) => () => {
      axios.patch(`/posts/${postId}`).then((res) => {
        console.log(res.data);
        mutate();
      });
    },
    []
  );

  const onDelete = useCallback(
    (postId: number) => () => {
      axios.delete(`/posts/${postId}`).then((res) => {
        console.log(res.data);
        mutate();
      });
    },
    []
  );

  return <ProfilePostsContext.Provider value={{ Posts, onEdit, onDelete }}>{children}</ProfilePostsContext.Provider>;
};

export const useProfilePosts = (): IContext => useContext(ProfilePostsContext);
export default ProfilePostsProvider;

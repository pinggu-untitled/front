import { createContext, useCallback, useContext } from 'react';
import { IMyPings, IPost } from '@typings/db';
import { IProvider, useSession } from '@contexts/SessionContext';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import readable from '@utils/readable';

interface IContext {
  Mypings: IMyPings[];
  Sharepings: IMyPings[];
  UserSharepings: IMyPings[];
  onFetchMypings: (mypingsId: number) => { data: IMyPings; mutate: any };
  onFetchMypingsPosts: (mypingsId: number) => { data: IPost[]; mutate: any };
  onEdit: (mypingsId: number) => () => void;
  onDelete: (mypingsId: number) => () => void;
}

const ProfileMypingsContext = createContext<IContext | any>({});
const ProfileMypingsProvider = ({ children }: IProvider) => {
  const { userId } = useParams<{ userId: string }>();
  const { session } = useSession();
  const { data: Mypings, mutate: mutateMypings } = useSWR<IMyPings[]>(
    userId ? `/users/${userId}/mypings` : null,
    fetcher,
  );

  const { data: Sharepings } = useSWR<IMyPings[]>(`/users/${session?.id}/sharepings`, fetcher);

  const { data: UserSharepings } = useSWR<IMyPings[]>(userId ? `/users/${userId}/sharepings` : null, fetcher);

  const onFetchMypings = useCallback((mypingsId: number) => {
    const { data, mutate } = useSWR<IMyPings[]>(`/mypings/${mypingsId}`, fetcher);
    return { data, mutate };
  }, []);

  const onFetchMypingsPosts = useCallback((mypingsId: number) => {
    const { data, mutate } = useSWR<IPost[]>(`/mypings/${mypingsId}/posts`, fetcher);
    return { data, mutate };
  }, []);

  const onEdit = useCallback(
    (mypingsId: number) => () => {
      axios.patch(`/mypings/${mypingsId}`).then((res) => {
        console.log(res.data);
        mutateMypings();
      });
    },
    [],
  );

  const onDelete = useCallback(
    (mypingsId: number) => () => {
      axios.delete(`/mypings/${mypingsId}`).then((res) => {
        console.log(res.data);
        mutateMypings();
      });
    },
    [],
  );

  return (
    <ProfileMypingsContext.Provider
      value={{
        Mypings: readable(session, Mypings),
        Sharepings: readable(session, Sharepings),
        UserSharepings: readable(session, UserSharepings),
        onFetchMypings,
        onFetchMypingsPosts,
        onEdit,
        onDelete,
      }}
    >
      {children}
    </ProfileMypingsContext.Provider>
  );
};

export const useProfileMypings = (): IContext => useContext(ProfileMypingsContext);
export default ProfileMypingsProvider;

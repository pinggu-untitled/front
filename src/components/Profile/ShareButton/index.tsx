import { CSSProperties, useEffect, useReducer } from 'react';
import toggleMutator from '@utils/toggleMutator';
import { Button } from '@components/Home/PostCard/LikeButton/style';
import { IMyPings } from '@typings/db';
import isIdExisting from '@utils/isIdExisting';
import { useSession } from '@contexts/SessionContext';
import { BsBookmark, BsBookmarkStarFill } from 'react-icons/bs';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
interface IProps {
  data: IMyPings;
  style?: CSSProperties;
}

const ShareButton = ({ data, style }: IProps) => {
  const { session } = useSession();
  // const { Sharepings } = useProfileMypings();
  const { data: Sharepings } = useSWR(`/users/${session?.id}/sharepings`, fetcher);
  const [share, toggleShare] = useReducer((prev: boolean, cur: boolean) => cur, false);

  useEffect(() => {
    toggleShare(isIdExisting(Sharepings, data));
  }, [Sharepings]);

  return (
    <Button
      onClick={toggleMutator(share ? 'inactive' : 'active', `/mypings/${data?.id}/sharepings`, toggleShare)}
      style={style}
    >
      {share ? <BsBookmarkStarFill style={{ color: '#fbab00' }} /> : <BsBookmark />}
    </Button>
  );
};

export default ShareButton;

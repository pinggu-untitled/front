import { Button } from '@components/Profile/FollowButton/style';
import { CSSProperties, useEffect, useReducer } from 'react';
import toggleMutator from '@utils/toggleMutator';
import { IUser } from '@typings/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useSession } from '@contexts/SessionContext';
import isIdExisting from '@utils/isIdExisting';

interface IProps {
  User: IUser;
  style?: CSSProperties;
}
const FollowButton = ({ User, style }: IProps) => {
  const { session } = useSession();
  const [follow, toggleFollow] = useReducer((prev: boolean, cur: boolean) => cur, false);

  const { data: Followings } = useSWR<IUser[]>(`/users/${session?.id}/followings`, fetcher);

  useEffect(() => {
    if (Followings && User) {
      toggleFollow(isIdExisting(Followings, User));
    }
  }, [Followings]);

  return (
    <Button onClick={toggleMutator(follow ? 'inactive' : 'active', `/follow/${User?.id}`, toggleFollow)} style={style}>
      {follow ? '팔로우 취소' : '팔로우'}
    </Button>
  );
};

export default FollowButton;

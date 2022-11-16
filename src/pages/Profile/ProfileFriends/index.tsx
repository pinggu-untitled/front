import { useParams } from 'react-router-dom';
import CardList from '@components/Home/CardList';
import { TapMain } from '@pages/Profile/ProfilePosts/style';
import { InnerTap, Tap } from '@pages/Profile/ProfileMypings/style';
import { memo, useState } from 'react';
import EmptyMessage from '@components/Profile/EmptyMessage';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useSession } from '@contexts/SessionContext';
import { IUser } from '@typings/db';
import FriendCard from '@components/Profile/cards/ProfileFollowCard';

type Tap = 'followings' | 'follower';

const ProfileFriends = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data: User } = useSWR<IUser>(`/users/${userId}`, fetcher);
  const { data: Followings } = useSWR<IUser[]>(`/users/${userId}/followings`, fetcher);
  const { data: Followers } = useSWR<IUser[]>(`/users/${userId}/followers`, fetcher);
  const { session } = useSession();
  const [tap, setTap] = useState<Tap>('followings');

  if (!Followings && !Followers) return <div>로딩중...</div>;

  return (
    <>
      <InnerTap>
        <Tap onClick={() => setTap('followings')} active={tap === 'followings'}>
          팔로잉
        </Tap>
        <Tap onClick={() => setTap('follower')} active={tap === 'follower'}>
          팔로워
        </Tap>
      </InnerTap>
      <TapMain style={{ position: 'absolute', top: '50px', width: '440px', bottom: 0 }}>
        <CardList>
          {tap === 'followings' &&
            (!Followings?.length ? (
              <EmptyMessage message={`아직 ${User?.nickname}님이 팔로잉하는 유저가 없어요.`} />
            ) : (
              Followings?.filter((user) => user.id !== session?.id).map((user) => (
                <FriendCard key={user?.id} data={user} />
              ))
            ))}
          {tap === 'follower' &&
            (!Followers?.length ? (
              <EmptyMessage message={`아직 ${User?.nickname}님을 팔로우하는 유저가 없어요.`} />
            ) : (
              Followers?.map((user) => <FriendCard key={user?.id} data={user} />)
            ))}
        </CardList>
      </TapMain>
    </>
  );
};

export default memo(ProfileFriends);

import { ProfileAvatar } from '@components/Layout/SideNavigation/ProfileButtonModal/style';
import { Card, Info } from './style';
import { IUser, IMe } from '@typings/db';
import mediaPath from '../../../utils/mediaPath';
import { useSession } from '@contexts/SessionContext';
import FollowButton from '@components/Profile/FollowButton';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';

const UserCard = ({ data }: { data: IUser | any }) => {
  const { session } = useSession();
  const { data: Followings } = useSWR<IUser[]>(`/users/${data.id}/followings`, fetcher);

  return (
    <Card>
      <ProfileAvatar style={{ width: '60px', height: '60px' }}>
        <img src={mediaPath('profile', data.profile_image_url)} alt={data.nickname} />
      </ProfileAvatar>
      <Info>
        <span className="nickname">
          {data.nickname} {session.id === data.id ? `(나)` : null}
        </span>
        <p className="follow">팔로워 {Followings?.length}명</p>
      </Info>
      {data.id !== session?.id && <FollowButton User={data} style={{ position: 'absolute', right: 10, top: 22 }} />}
    </Card>
  );
};

export default UserCard;

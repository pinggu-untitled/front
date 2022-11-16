import LikeButton from '@components/Home/PostCard/LikeButton';
import { IPost, IUser } from '@typings/db';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@contexts/SessionContext';
import isIdExisting from '@utils/isIdExisting';
import FollowButton from '@components/Profile/FollowButton';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Card } from '@components/Home/PostCard/style';
import { ProfileAvatar } from '@components/Layout/SideNavigation/ProfileButtonModal/style';
import mediaPath from '@utils/mediaPath';

const AuthorCard = ({ data }: { data: IPost }) => {
  const navigate = useNavigate();
  const { session } = useSession();
  const { data: Followings } = useSWR<IUser[]>(`/users/${session?.id}/followings`, fetcher);

  if (Followings) {
    console.log('match', isIdExisting(Followings, data));
  }
  if (!Followings) return <div>로딩중..</div>;

  return (
    <Card
      style={{
        padding: '10px',
        position: 'relative',
        flexDirection: 'row',
        borderBottom: '1px solid #dfdfdf',
        justifyContent: 'space-between',
      }}
    >
      <div className={'left'} style={{ display: 'flex', alignItems: 'center' }}>
        <ProfileAvatar style={{ width: '40px', height: '40px' }} onClick={() => navigate(`/${data.User.id}`)}>
          <img src={mediaPath('profile', data.User.profile_image_url)} alt={data.User.nickname} />
        </ProfileAvatar>
        <span className={'nickname'} style={{ marginLeft: '8px', fontSize: '15px', fontWeight: 600 }}>
          {data.User.nickname} {data.id === session?.id ? '(나)' : null}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <LikeButton data={data} />
        {data.User.id !== session?.id && <FollowButton User={data.User} style={{ marginLeft: '12px' }} />}
      </div>
    </Card>
  );
};

export default AuthorCard;

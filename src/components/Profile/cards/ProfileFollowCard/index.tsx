import { IUser } from '@typings/db';
import { useNavigate, useParams } from 'react-router-dom';
import { useSession } from '@contexts/SessionContext';
import isIdExisting from '@utils/isIdExisting';
import FollowButton from '@components/Profile/FollowButton';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import {
  Card,
  Inner,
  Info,
  NoMedia,
  PostImage,
  CountsInfo,
} from '@components/Home/PostCard/style';
import { ProfileAvatar } from '@components/Layout/SideNavigation/ProfileButtonModal/style';
import mediaPath from '@utils/mediaPath';
import { memo } from 'react';

const FriendCard = ({ data }: { data: IUser }) => {
  const navigate = useNavigate();
  const { session } = useSession();
  const { data: Followings } = useSWR<IUser[]>(
    `/users/${session?.id}/followings`,
    fetcher
  );

  if (Followings) {
    console.log('match', isIdExisting(Followings, data));
  }
  if (!Followings) return <div>로딩중..</div>;

  return (
    <Card
      onClick={() => navigate(`/${data.id}`)}
      style={{ padding: '10px 0', position: 'relative' }}
    >
      <div className={'left'} style={{ display: 'flex', alignItems: 'center' }}>
        <ProfileAvatar style={{ width: '40px', height: '40px' }}>
          <img src={mediaPath(data.profile_image_url)} alt={data.nickname} />
        </ProfileAvatar>
        <span
          className={'nickname'}
          style={{ marginLeft: '8px', fontSize: '15px', fontWeight: 600 }}
        >
          {data.nickname} {data.id === session?.id ? '(나)' : null}
        </span>
      </div>
      {data.id !== session?.id && (
        <FollowButton
          User={data}
          style={{ position: 'absolute', top: '25px', right: '20px' }}
        />
      )}
    </Card>
  );
};

export default memo(FriendCard);

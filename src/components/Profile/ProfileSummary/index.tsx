import { useSession } from '@contexts/SessionContext';
import useSWR from 'swr';
import { useNavigate, useParams } from 'react-router-dom';
import fetcher from '@utils/fetcher';
import { ProfileAvatar } from '@components/Layout/SideNavigation/ProfileButtonModal/style';
import { IUser } from '@typings/db';
import {
  Summary,
  Info,
  EditButton,
} from '@components/Profile/ProfileSummary/style';
import regexifyContent from '@utils/regexifyContent';
import FollowButton from '@components/Profile/FollowButton';
import isIdExisting from '@utils/isIdExisting';
import mediaPath from '@utils/mediaPath';

const ProfileSummary = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { session } = useSession();
  const { data: User } = useSWR<IUser>(`/users/${userId}`, fetcher);
  const { data: Followings } = useSWR<IUser[]>(
    `/users/${session?.id}/followings`,
    fetcher
  );

  if (!User || !Followings) return <div>로딩중...</div>;

  return (
    <Summary>
      <ProfileAvatar style={{ width: '120px', height: '120px' }}>
        <img src={mediaPath(User?.profile_image_url)} alt={User?.nickname} />
      </ProfileAvatar>
      <Info>
        <h2>{User?.nickname}</h2>
        <p>{regexifyContent(User?.bio)}</p>
        {session?.id === Number(userId) ? (
          <EditButton onClick={() => navigate(`/${userId}/edit`)}>
            프로필 수정
          </EditButton>
        ) : (
          <FollowButton
            User={User}
            // userId={userId}
            // isActive={isIdExisting(Followings, User)}
            style={{ position: 'absolute', top: '25px', right: '20px' }}
          />
        )}
      </Info>
    </Summary>
  );
};

export default ProfileSummary;

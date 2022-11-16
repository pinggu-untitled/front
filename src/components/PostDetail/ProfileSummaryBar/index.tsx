import { IMe, IPost, IUser } from '@typings/db';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import mediaPath from '@utils/mediaPath';
import { ProfileAvatar } from '@components/Layout/SideNavigation/ProfileButtonModal/style';
import FollowButton from '@components/Profile/FollowButton';
import { useSession } from '@contexts/SessionContext';

export const Base = styled.div`
  width: 100%;
  position: sticky;
  padding: 6px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  > .left {
    display: flex;
    align-items: center;
    > .nickname {
      display: inline-block;
      font-size: 15px;
      font-weight: 700;
      margin-left: 10px;
    }
  }
`;
const ProfileSummaryBar = ({ data }: { data: IUser }) => {
  const navigate = useNavigate();
  const { session } = useSession();
  const { postId } = useParams<{ postId: string }>();
  const { data: md } = useSWR<IMe>('/users/me', fetcher);
  const { data: pd } = useSWR<IPost>(`/posts/${postId}`, fetcher);
  const { data: Followings } = useSWR<IUser[]>(`/users/${session?.id}/followings`, fetcher);

  if (!Followings) return <div>로딩중...</div>;
  return (
    <Base>
      <ProfileAvatar
        style={{
          position: 'absolute',
          bottom: '4px',
          right: 0,
          width: '34px',
          height: '34px',
        }}
        onClick={() => navigate(`/${data.id}`)}
      >
        <img src={mediaPath('profile', data.profile_image_url)} alt={data.nickname} />
      </ProfileAvatar>
      {md?.id === pd?.User.id ? (
        <div>내 게시물</div>
      ) : (
        <FollowButton User={data} style={{ position: 'absolute', top: '25px', right: '20px' }} />
      )}
    </Base>
  );
};

export default ProfileSummaryBar;

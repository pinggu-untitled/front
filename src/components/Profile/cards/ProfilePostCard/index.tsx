import {
  Card,
  Inner,
  Info,
  NoMedia,
  PostImage,
  TotalCount,
} from '@components/Home/PostCard/style';
import { ProfileAvatar } from '@components/Layout/SideNavigation/ProfileButtonModal/style';
import { useSession } from '@contexts/SessionContext';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineCamera } from 'react-icons/hi';
import { memo, useCallback } from 'react';
import LikeButton from '@components/Home/PostCard/LikeButton';
import mediaPath from '@utils/mediaPath';
import OwnerActionButtons from '@components/Profile/OwnerActionButtons';
import { IUserPost } from '@typings/db';
import { useProfilePosts } from '@contexts/ProfilePostsContext';

interface IProps {
  data: IUserPost;
}

const ProfilePostCard = ({ data }: IProps) => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { session } = useSession();
  const { onDelete } = useProfilePosts();
  const onPost = () => navigate(`/posts/${data.id}`);
  const onProfile = (e: any) => {
    e.stopPropagation();
    navigate(`/${data.User.id}`);
  };

  const transformFn = useCallback(
    (data: IUserPost) => {
      const copy = { ...data };
      copy.Likers = data.Likers.map((user: any) => user.User);
      return copy;
    },
    [data]
  );

  return (
    <Card onClick={onPost}>
      <Inner>
        <PostImage>
          {data?.Images.length > 0 ? (
            <>
              <TotalCount>
                <span className={'current'}>1</span> / {data?.Images.length}
              </TotalCount>
              <img
                src={`http://localhost:8080/uploads/${data?.Images[0].src}`}
              />
            </>
          ) : (
            <NoMedia>
              <HiOutlineCamera />
            </NoMedia>
          )}
        </PostImage>
        <Info>
          <h3>{data.title}</h3>
          <span className={'created-at'}>{data.created_at}</span>
          {session?.id !== Number(data.User.id) && (
            <ProfileAvatar
              onClick={onProfile}
              style={{
                width: '34px',
                height: '34px',
                position: 'absolute',
                right: 0,
                bottom: '6px',
              }}
            >
              <img src={mediaPath(data.User.profile_image_url)} />
            </ProfileAvatar>
          )}
          <LikeButton
            data={transformFn(data)}
            style={{ position: 'absolute', top: '4px', right: 0 }}
          />
        </Info>
      </Inner>
      {session?.id === Number(userId) && (
        <OwnerActionButtons
          editPageUrl={`/posts/${data.id}/edit`}
          onDelete={onDelete(data.id)}
        />
      )}
    </Card>
  );
};

export default memo(ProfilePostCard);

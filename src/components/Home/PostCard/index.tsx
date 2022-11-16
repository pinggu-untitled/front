import { IPost, IUserPost } from '@typings/db';
import { Card, Info, Inner, NoMedia, PostImage, TotalCount } from '@components/Home/PostCard/style';
import { ProfileAvatar } from '@components/Layout/SideNavigation/ProfileButtonModal/style';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineCamera } from 'react-icons/hi';
import { forwardRef, LegacyRef, memo } from 'react';
import LikeButton from './LikeButton';
import mediaPath from '@utils/mediaPath';
import timeForToday from '@utils/timeForToday';
import PrivateTag from '@components/Profile/PrivateTag';

interface IProps {
  data: IPost | IUserPost;
  ref?: LegacyRef<HTMLLIElement>;
}

const PostCard = forwardRef(({ data }: IProps, ref: LegacyRef<HTMLLIElement>) => {
  const navigate = useNavigate();
  const { mypingsId } = useParams<{ mypingsId: string }>();
  const onPost = () => navigate(`/posts/${data.id}`);
  const onProfile = (e: any) => {
    e.stopPropagation();
    navigate(`/${data.User.id}`);
  };

  return (
    <Card onClick={onPost} ref={ref}>
      <Inner>
        <PostImage>
          {data?.Images.length > 0 ? (
            <>
              <TotalCount>
                <span className={'current'}>1</span> / {data?.Images.length}
              </TotalCount>
              <img src={mediaPath('post', data?.Images[0].src)} alt={data.User.nickname} />
            </>
          ) : (
            <NoMedia>
              <HiOutlineCamera />
            </NoMedia>
          )}
        </PostImage>
        <Info>
          <h3>
            {data.title}
            <PrivateTag active={data?.is_private} />
          </h3>
          <span className={'created-at'}>{timeForToday(Date.parse(data.created_at))}</span>
          {!mypingsId && (
            <ProfileAvatar
              style={{
                position: 'absolute',
                bottom: '4px',
                right: 0,
                width: '34px',
                height: '34px',
              }}
              onClick={onProfile}
            >
              <img src={mediaPath('profile', data.User.profile_image_url)} alt={data.User.nickname} />
            </ProfileAvatar>
          )}
          <LikeButton data={data} style={{ position: 'absolute', top: '4px', right: 0 }} />
        </Info>
      </Inner>
    </Card>
  );
});

export default memo(PostCard);

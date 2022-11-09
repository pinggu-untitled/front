import { IPost, IUserPost } from '@typings/db';
import {
  Card,
  Inner,
  Info,
  NoMedia,
  PostImage,
  TotalCount,
} from '@components/Home/PostCard/style';
import { ProfileAvatar } from '@components/Layout/SideNavigation/ProfileButtonModal/style';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineCamera } from 'react-icons/hi';
import { memo } from 'react';
import LikeButton from './LikeButton';
import mediaPath from '@utils/mediaPath';

interface IProps {
  data: IPost | IUserPost;
}

const PostCard = ({ data }: IProps) => {
  const navigate = useNavigate();
  const { mypingsId } = useParams<{ mypingsId: string }>();
  const onPost = () => navigate(`/posts/${data.id}`);
  const onProfile = (e: any) => {
    e.stopPropagation();
    navigate(`/${data.User.id}`);
  };

  // const mut = (data) =>
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
              <img src={mediaPath(data.User.profile_image_url)} />
            </ProfileAvatar>
          )}
          <LikeButton
            data={data}
            style={{ position: 'absolute', top: '4px', right: 0 }}
          />
        </Info>
      </Inner>
    </Card>
  );
};

export default memo(PostCard);

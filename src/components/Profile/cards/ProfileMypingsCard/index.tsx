import { Card, Inner, Info, NoMedia, PostImage, CountsInfo } from '@components/Home/PostCard/style';
import { ProfileAvatar } from '@components/Layout/SideNavigation/ProfileButtonModal/style';
import { useSession } from '@contexts/SessionContext';
import { useNavigate, useParams } from 'react-router-dom';
import { memo } from 'react';
import mediaPath from '@utils/mediaPath';
import OwnerActionButtons from '@components/Profile/OwnerActionButtons';
import { IMyPings } from '@typings/db';
import ShareButton from '@components/Profile/ShareButton';
import { useProfileMypings } from '@contexts/ProfileMypingsContext';
import PrivateTag from '@components/Profile/PrivateTag';
import CateTag from '@components/Profile/CateTag';

interface IProps {
  data: IMyPings;
}

const ProfileMypingsCard = ({ data }: IProps) => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { session } = useSession();
  const { onDelete, onFetchMypingsPosts } = useProfileMypings();
  const onMypings = () => navigate(`/mypings/${data.id}`);
  const { data: Posts } = onFetchMypingsPosts(data.id);
  const onProfile = (e: any) => {
    e.stopPropagation();
    navigate(`/${data?.User.id}`);
  };

  return (
    <Card onClick={onMypings}>
      <Inner>
        <PostImage>
          <NoMedia>{data.title.slice(0, 1).toUpperCase()}</NoMedia>
        </PostImage>
        <Info>
          <h3>
            {data.title}
            <PrivateTag active={data?.is_private} />
          </h3>
          <CateTag cateNumber={data?.category} />
          {session.id !== data?.User.id && (
            <ProfileAvatar
              onClick={onProfile}
              style={{
                width: '30px',
                height: '30px',
                position: 'absolute',
                right: 0,
                bottom: '6px',
              }}
            >
              <img src={mediaPath(data.User.profile_image_url)} />
            </ProfileAvatar>
          )}
          {session?.id !== Number(data?.User.id) && (
            <ShareButton data={data} style={{ position: 'absolute', top: '4px', right: 0 }} />
          )}
          <CountsInfo>
            <span className={'info'}>
              게시물 <span className={'current'}>{Posts?.length}</span>
            </span>
          </CountsInfo>
        </Info>
      </Inner>
      {session?.id === Number(data?.User.id) && (
        <OwnerActionButtons editPageUrl={`/mypings/${data.id}/edit`} onDelete={onDelete(data.id)} />
      )}
    </Card>
  );
};

export default memo(ProfileMypingsCard);

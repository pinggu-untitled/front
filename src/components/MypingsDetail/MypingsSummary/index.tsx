import { IMyPings } from '@typings/db';
import { useNavigate, useParams } from 'react-router-dom';
import { useSession } from '@contexts/SessionContext';
import { CountsInfo, Info, Inner, NoMedia, PostImage } from '@components/Home/PostCard/style';
import PrivateTag from '@components/Profile/PrivateTag';
import CateTag from '@components/Profile/CateTag';
import { ProfileAvatar } from '@components/Layout/SideNavigation/ProfileButtonModal/style';
import mediaPath from '@utils/mediaPath';
import ShareButton from '@components/Profile/ShareButton';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Summary, Text } from '@components/MypingsDetail/MypingsSummary/style';
import { IoArrowDownCircle } from 'react-icons/io5';

const MypingsSummary = ({ data }: { data: IMyPings }) => {
  const navigate = useNavigate();
  const { mypingsId } = useParams<{ mypingsId: string }>();
  const { session } = useSession();
  const { data: MypingsPosts } = useSWR(`/mypings/${mypingsId}/posts`, fetcher);
  const onProfile = (e: any) => {
    e.stopPropagation();
    navigate(`/${data?.User.id}`);
  };

  return (
    <Summary>
      <Inner>
        <PostImage style={{ width: '100px', height: '100px' }}>
          <NoMedia>{data.title.slice(0, 1).toUpperCase()}</NoMedia>
        </PostImage>
        <Info>
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>
            {data.title}
            <PrivateTag active={data?.is_private} />
          </h3>
          <CateTag cateNumber={data?.category} />
          <ProfileAvatar
            onClick={onProfile}
            style={{ width: '50px', height: '50px', position: 'absolute', right: 0, bottom: '6px' }}
          >
            <img src={mediaPath(data.User.profile_image_url)} />
          </ProfileAvatar>
          {session?.id !== Number(data?.User.id) && (
            <ShareButton data={data} style={{ position: 'absolute', top: '4px', right: 0 }} />
          )}
          <CountsInfo>
            <span className={'info'}>
              게시물 <span className={'current'}>{MypingsPosts?.length}</span>
            </span>
          </CountsInfo>
        </Info>
      </Inner>
      <Text>
        <strong>{data?.title}</strong> 의 게시물을 확인하세요
        <IoArrowDownCircle />
      </Text>
    </Summary>
  );
};

export default MypingsSummary;

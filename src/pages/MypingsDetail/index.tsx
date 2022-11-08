import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { PageMain } from '@pages/Home/style';
import { useNavigate, useParams } from 'react-router-dom';
import { useSession } from '@contexts/SessionContext';
import { IMenuItem } from '@components/Layout/MenuList/MenuItem';
import { BiEditAlt, BiLinkAlt } from 'react-icons/bi';
import PageTitleHeader from '@components/headers/PageTitleHeader';
import CardList from '@components/Home/CardList';
import PostCard from '@components/Home/PostCard';
import { IPost, IMyPings } from '@typings/db';
import MypingsSummary from '@components/MypingsDetail/MypingsSummary';
import EmptyMessage from '@components/Profile/EmptyMessage';
import readable from '@utils/readable';
import ProfileMypingsCard from '@components/Profile/cards/ProfileMypingsCard';
import ProfilePostCard from '@components/Profile/cards/ProfilePostCard';

const MypingsDetail = () => {
  const navigate = useNavigate();
  const { mypingsId } = useParams<{ mypingsId: string }>();
  const { session } = useSession();
  const { data: Mypings } = useSWR<IMyPings>(`/mypings/${mypingsId}`, fetcher);
  const { data: MypingsPosts } = useSWR<IPost[]>(`/mypings/${mypingsId}/posts`, fetcher);

  const items: IMenuItem[] = [
    { icon: <BiEditAlt />, title: '마이핑스 수정하기', onClick: () => navigate(`mypings/${mypingsId}/edit`) },
  ];
  const readOnlyItems: IMenuItem[] = [
    { icon: <BiLinkAlt />, title: '링크 복사하기', onClick: () => navigate('/posts/new') },
  ];

  if (!Mypings || !MypingsPosts) return <div>로딩중...</div>;

  return (
    <>
      <PageTitleHeader title={'마이핑스'} menuItems={items} style={{ borderBottom: 'none' }} />
      <PageMain>
        <div style={{ display: 'float', top: '70px', width: '440px', zIndex: 1000, backgroundColor: '#fff' }}>
          <MypingsSummary data={Mypings} />
        </div>
        <div style={{ position: 'absolute', top: '160px', bottom: '0', width: '440px', overflow: 'scroll' }}>
          {!MypingsPosts?.length ? (
            <EmptyMessage message={`아직 ${Mypings?.User.nickname}님이 공유한 게시물이 없어요.`} />
          ) : (
            <CardList>
              {readable(session?.id, MypingsPosts)?.map((Post) => (
                // <PostCard key={Post.id} data={Post} />
                <ProfilePostCard key={Post.id} data={Post} />
              ))}
            </CardList>
          )}
        </div>
      </PageMain>
    </>
  );
};

export default MypingsDetail;

import { IMenuItem } from '@components/Layout/MenuList/MenuItem';
import { BiEditAlt, BiLinkAlt } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { TapMain } from '@pages/Profile/ProfilePosts/style';
import CardList from '@components/Home/CardList';
import ProfilePostCard from '@components/Profile/cards/ProfilePostCard';
import { useProfilePosts } from '@contexts/ProfilePostsContext';
import EmptyMessage from '@components/Profile/EmptyMessage';

const ProfilePosts = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { Posts } = useProfilePosts();
  const items: IMenuItem[] = [
    { icon: <BiEditAlt />, title: '프로필 수정하기', onClick: () => navigate(`/${userId}/edit`) },
  ];
  const readOnlyItems: IMenuItem[] = [
    { icon: <BiLinkAlt />, title: '링크 복사하기', onClick: () => navigate('/posts/new') },
  ];

  if (!userId) return <div>로딩중...</div>;

  return (
    <TapMain>
      <CardList>
        {!Posts?.length ? (
          <EmptyMessage message={'아직 회원님이 작성한 게시물이 없어요.'} />
        ) : (
          Posts?.map((Post) => <ProfilePostCard key={Post?.id} data={Post} />)
        )}
      </CardList>
    </TapMain>
  );
};

export default ProfilePosts;

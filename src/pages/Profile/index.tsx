import PageHeader from '@components/headers/PageMainHeader';
import { PageMain } from '@pages/Home/style';
import { useSession } from '@contexts/SessionContext';
import PagePrevHeader from '@components/headers/PagePrevHeader';
import { IMenuItem } from '@components/Layout/MenuList/MenuItem';
import { BiEditAlt, BiLinkAlt } from 'react-icons/bi';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import ProfileSummary from '@components/Profile/ProfileSummary';
import TapZone from '@components/Profile/TapZone';
import ProfilePostsProvider from '@contexts/ProfilePostsContext';
import ProfileMypingsProvider from '@contexts/ProfileMypingsContext';

const Profile = () => {
  const navigate = useNavigate();
  const { session } = useSession();
  const { userId } = useParams<{ userId: string }>();

  const items: IMenuItem[] = [
    {
      icon: <BiEditAlt />,
      title: '프로필 수정하기',
      onClick: () => navigate(`/${userId}/edit`),
    },
  ];
  const readOnlyItems: IMenuItem[] = [
    {
      icon: <BiLinkAlt />,
      title: '링크 복사하기',
      onClick: () => navigate('/posts/new'),
    },
  ];

  if (!session || !userId) return <div>로딩중...</div>;
  return (
    <>
      {session?.id === Number(userId) ? <PageHeader pageName={'내 프로필'} /> : <PagePrevHeader menuItems={items} />}
      <PageMain>
        <div
          style={{
            display: 'float',
            top: '70px',
            width: '440px',
            zIndex: 1000,
            backgroundColor: '#fff',
          }}
        >
          <ProfileSummary />
          <TapZone userId={userId} />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '220px',
            bottom: '0',
            width: '440px',
            overflow: 'scroll',
          }}
        >
          <ProfilePostsProvider>
            <ProfileMypingsProvider>
              <Outlet />
            </ProfileMypingsProvider>
          </ProfilePostsProvider>
        </div>
      </PageMain>
    </>
  );
};

export default Profile;

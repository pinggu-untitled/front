import { useSession } from '@contexts/SessionContext';
import { IMenuItem } from '@components/Layout/MenuList/MenuItem';
import { BiEditAlt, BiLinkAlt } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import CardList from '@components/Home/CardList';
import { TapMain } from '@pages/Profile/ProfilePosts/style';
import { useProfileMypings } from '@contexts/ProfileMypingsContext';
import ProfileMypingsCard from '@components/Profile/cards/ProfileMypingsCard';
import { InnerTap, Tap } from '@pages/Profile/ProfileMypings/style';
import { useState } from 'react';
import isIdExisting from '@utils/isIdExisting';
import EmptyMessage from '@components/Profile/EmptyMessage';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
type Tap = 'all' | 'mypings' | 'sharepings';

const ProfileMypings = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { Mypings, UserSharepings } = useProfileMypings();
  const { data: User } = useSWR<IUser>(`/users/${userId}`, fetcher);

  const [tap, setTap] = useState<Tap>('all');

  const items: IMenuItem[] = [
    { icon: <BiEditAlt />, title: '프로필 수정하기', onClick: () => navigate(`/${userId}/edit`) },
  ];
  const readOnlyItems: IMenuItem[] = [
    { icon: <BiLinkAlt />, title: '링크 복사하기', onClick: () => navigate('/posts/new') },
  ];

  if (!userId && !Mypings && !UserSharepings) return <div>로딩중...</div>;

  return (
    <>
      <InnerTap>
        <Tap onClick={() => setTap('all')} active={tap === 'all'}>
          모두
        </Tap>
        <Tap onClick={() => setTap('mypings')} active={tap === 'mypings'}>
          마이핑스
        </Tap>
        <Tap onClick={() => setTap('sharepings')} active={tap === 'sharepings'}>
          쉐어핑스
        </Tap>
      </InnerTap>
      <TapMain style={{ position: 'absolute', top: '50px', width: '440px', bottom: 0 }}>
        <CardList>
          {tap === 'all' &&
            (!Mypings?.length && !UserSharepings?.length ? (
              <EmptyMessage message={'아직 비어있어요.'} />
            ) : (
              <>
                {Mypings?.map((mypings) => (
                  <ProfileMypingsCard key={mypings?.id} data={mypings} />
                ))}
                {UserSharepings?.map((mypings) => (
                  <ProfileMypingsCard key={mypings?.id} data={mypings} />
                ))}
              </>
            ))}
          {tap === 'mypings' &&
            (!Mypings?.length ? (
              <EmptyMessage message={`아직 ${User?.nickname}님이 작성한 마이핑스가 없어요.`} />
            ) : (
              Mypings?.map((mypings) => <ProfileMypingsCard key={mypings?.id} data={mypings} />)
            ))}
          {tap === 'sharepings' &&
            (!UserSharepings?.length ? (
              <EmptyMessage message={`아직 ${User?.nickname}님이 공유하고 있는 쉐어핑스가 없어요`} />
            ) : (
              UserSharepings?.map((mypings) => <ProfileMypingsCard key={mypings?.id} data={mypings} />)
            ))}
        </CardList>
      </TapMain>
    </>
  );
};

export default ProfileMypings;

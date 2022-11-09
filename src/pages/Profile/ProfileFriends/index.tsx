// import PageHeader from '@components/headers/PageMainHeader';
// import { PageMain } from '@pages/Home/style';
// import { useSession } from '@contexts/SessionContext';
// import PagePrevHeader from '@components/headers/PagePrevHeader';
// import { IMenuItem } from '@components/Layout/MenuList/MenuItem';
// import { BiEditAlt, BiLinkAlt } from 'react-icons/bi';
// import { useNavigate, useParams } from 'react-router-dom';
// import ProfileSummary from '@components/Profile/ProfileSummary';
// import { IoMdGrid } from 'react-icons/io';
// import { MdBookmarkBorder } from 'react-icons/md';
// import { TbUsers } from 'react-icons/tb';
// import TapZone from '@components/Profile/TapZone';
// const ProfileFriends = () => {
//   const navigate = useNavigate();
//   const { userId } = useParams<{ userId: string }>();
//   const { session } = useSession();
//
//   if (!userId) return <div>로딩중...</div>;
//   return <div>zzzz</div>;
// };
//
// export default ProfileFriends;
//
//
// import React, { Dispatch, FC, memo, useEffect, useState } from 'react';
// import styled from '@emotion/styled';
// import { IMe, IUser } from '@typings/db';
// import ProfileAvatar from '@components/revised/common/images/ProfileAvatar';
// import { useNavigate } from 'react-router-dom';
// import useSWR from 'swr';
// import fetcher from '@utils/fetcher';
// import FollowActionButton from '../FollowActionButton';
// import isIdExisting from '@utils/isIdExisting';
// import actionHandler from '@utils/actionHandler';
// import handleNavigate from '@utils/handleNavigate';
//
// interface IProps {
//   profile: IUser;
// }
//
// export const Base = styled.li`
//   position: relative;
//   padding: 10px 0;
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   justify-content: space-between;
//
//   > .left {
//     display: flex;
//     align-items: center;
//     > .nickname {
//       font-size: 16px;
//       font-weight: 700;
//       margin-left: 10px;
//     }
//   }
// `;

import { IMenuItem } from '@components/Layout/MenuList/MenuItem';
import { BiEditAlt, BiLinkAlt } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import CardList from '@components/Home/CardList';
import { TapMain } from '@pages/Profile/ProfilePosts/style';
import ProfileMypingsCard from '@components/Profile/cards/ProfileMypingsCard';
import { InnerTap, Tap } from '@pages/Profile/ProfileMypings/style';
import { memo, useState } from 'react';
import EmptyMessage from '@components/Profile/EmptyMessage';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useSession } from '@contexts/SessionContext';
import { IUser } from '@typings/db';
import FriendCard from '@components/Profile/cards/ProfileFollowCard';
type Tap = 'followings' | 'follower';

const ProfileFriends = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { data: User } = useSWR<IUser>(`/users/${userId}`, fetcher);
  const { data: Followings } = useSWR<IUser[]>(
    `/users/${userId}/followings`,
    fetcher
  );
  const { data: Followers } = useSWR<IUser[]>(
    `/users/${userId}/followers`,
    fetcher
  );
  const { session } = useSession();
  const [tap, setTap] = useState<Tap>('followings');

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

  if (!Followings && !Followers) return <div>로딩중...</div>;

  return (
    <>
      <InnerTap>
        <Tap onClick={() => setTap('followings')} active={tap === 'followings'}>
          팔로잉
        </Tap>
        <Tap onClick={() => setTap('follower')} active={tap === 'follower'}>
          팔로워
        </Tap>
      </InnerTap>
      <TapMain
        style={{ position: 'absolute', top: '50px', width: '440px', bottom: 0 }}
      >
        <CardList>
          {tap === 'followings' &&
            (!Followings?.length ? (
              <EmptyMessage
                message={`아직 ${User?.nickname}님이 팔로잉하는 유저가 없어요.`}
              />
            ) : (
              Followings?.filter((user) => user.id !== session?.id).map(
                (user) => <FriendCard key={user?.id} data={user} />
              )
            ))}
          {tap === 'follower' &&
            (!Followers?.length ? (
              <EmptyMessage
                message={`아직 ${User?.nickname}님을 팔로우하는 유저가 없어요.`}
              />
            ) : (
              Followers?.map((user) => (
                <FriendCard key={user?.id} data={user} />
              ))
            ))}
        </CardList>
      </TapMain>
    </>
  );
};

export default memo(ProfileFriends);

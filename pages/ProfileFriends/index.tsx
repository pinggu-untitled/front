import React, { useState, useCallback, useReducer } from 'react';
import styled from '@emotion/styled';
import { IUser, IMe } from '@typings/db';
import CardList from '@components/revised/CardList';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { v4 as uuid } from 'uuid';
import { Base, MainContentZone } from '../ProfilePosts';
import FriendCard from '@components/revised/Profile/FriendCard';
import { useParams } from 'react-router-dom';
import EmptyMessage from '@components/revised/Profile/EmptyMessage';

export const SortButtonZone = styled.div`
  display: flex;
  padding: 10px 20px;
`;

export const Tap = styled.div<{ active: boolean }>`
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  font-size: 13px;
  font-weight: 600;
  border-bottom: ${({ active }) => (active ? '1px solid gray' : 'none')};
  color: ${({ active }) => (active ? '#191919' : 'gray')};
  cursor: pointer;
`;

type Tap = 'follower' | 'following';

const ProfileFriends = () => {
  const [, rerender] = useState();
  const { userId } = useParams<{ userId: string }>();
  const { data: md, mutate: mutateMd } = useSWR<IMe>(`/users/me`, fetcher);
  const { data: ud, mutate: mutateUd } = useSWR<IUser[]>(`/users/${userId}`, fetcher);
  const [tap, setTap] = useReducer((prev: Tap, cur: Tap): Tap => cur, 'following');
  const { data: followingsData, mutate: mutateFollowings } = useSWR<IUser[]>(`/users/${userId}/followings`, fetcher);
  const { data: followersData, mutate: mutateFollowers } = useSWR<IUser[]>(`/users/${userId}/followers`, fetcher);
  const { data: myFollowingData, mutate: mutateMyFollowingData } = useSWR<IUser[]>(
    `/users/${md?.id}/followings`,
    fetcher,
  );

  return (
    <>
      <Base>
        <SortButtonZone>
          <Tap active={tap === 'following'} onClick={() => setTap('following')}>
            팔로잉
          </Tap>
          <Tap active={tap === 'follower'} onClick={() => setTap('follower')}>
            팔로워
          </Tap>
        </SortButtonZone>
        <MainContentZone style={{ top: '270px' }}>
          {tap === 'following' && !followingsData?.length ? (
            <EmptyMessage message={'아직 회원님이 팔로잉하는 유저가 없어요.'} />
          ) : tap === 'follower' && !followersData?.length ? (
            <EmptyMessage message={'아직 회원님을 팔로우하는 유저가 없어요.'} />
          ) : (
            <CardList>
              {md &&
                myFollowingData &&
                (tap === 'following' ? followingsData : followersData)?.map((user, i) => (
                  <FriendCard key={uuid()} profile={user} />
                ))}
            </CardList>
          )}
        </MainContentZone>
      </Base>
    </>
  );
};

export default ProfileFriends;

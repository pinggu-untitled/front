import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { IUser, IMe } from '@typings/db';
import CardList from '@components/revised/CardList';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import SettingsButton from '@components/revised/Profile/SettingsButton';
import SettingsModal from '@components/revised/SettingsModal';
import { FiScissors } from 'react-icons/fi';
import { v4 as uuid } from 'uuid';
import { Base, MainContentZone } from '../ProfilePosts';
import FriendCard from '@components/revised/Profile/FriendCard';
import { useParams } from 'react-router-dom';
import mutateFollow from '@utils/mutateFollow';
import isIdExisting from '@utils/isIdExisting';
import EmptyMessage from '@components/revised/Profile/EmptyMessage';

export interface ICheckedPost {
  id: number;
  title: string;
}

export const SortButtonZone = styled.div`
  display: flex;
  padding: 10px 20px;
`;

export const Button = styled.div<{ active: boolean }>`
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

export const EmptyMessageZone = styled.div``;

export type TFollow = 'follower' | 'following';

const ProfileFriends = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data: md, mutate: mutateMd } = useSWR<IMe>(`/users/me`, fetcher);
  const { data: ud, mutate: mutateUd } = useSWR<IUser[]>(`/users/${userId}`, fetcher);
  const [follow, setFollow] = useState<TFollow>('following');
  const { data: followingsData, mutate: mutateFollowings } = useSWR<IUser[]>(`/users/${userId}/followings`, fetcher);
  const { data: followersData, mutate: mutateFollowers } = useSWR<IUser[]>(`/users/${userId}/followers`, fetcher);
  const toggleFollow = (type: TFollow) => () => setFollow(type);

  const [showModals, setShowModals] = useState<{ [key: string]: boolean }>({
    showSettingsModal: false,
  });

  const handleModal = (modalName: string) => () => {
    setShowModals((pv) => ({ ...pv, [modalName]: !pv[modalName] }));
  };

  const userSettingItems = [
    { content: { icon: <FiScissors />, title: '편집하기' }, onClick: handleModal('showEditModal') },
  ];

  return (
    <>
      <Base>
        <MainContentZone>
          <SortButtonZone>
            <Button active={follow === 'following'} onClick={toggleFollow('following')}>
              팔로잉
            </Button>
            <Button active={follow === 'follower'} onClick={toggleFollow('follower')}>
              팔로워
            </Button>
          </SortButtonZone>
          {follow === 'following' && !followingsData?.length ? (
            <EmptyMessage message={'아직 회원님이 팔로잉하는 유저가 없어요.'} />
          ) : follow === 'follower' && !followersData?.length ? (
            <EmptyMessage message={'아직 회원님을 팔로우하는 유저가 없어요.'} />
          ) : (
            <CardList>
              {(follow === 'following' ? followingsData : followersData)?.map((user, i) => (
                <FriendCard
                  key={uuid()}
                  profile={user}
                  isFollowing={isIdExisting(followingsData, user)}
                  handleFollow={mutateFollow(isIdExisting(followingsData, user) ? 'following' : 'follower')}
                />
              ))}
            </CardList>
          )}
        </MainContentZone>
        <SettingsButton onClick={handleModal('showSettingsModal')} />
        <SettingsModal
          show={showModals.showSettingsModal}
          onCloseModal={handleModal('showSettingsModal')}
          items={userSettingItems}
          style={{ bottom: '80px', left: '310px' }}
        />
      </Base>
    </>
  );
};

export default ProfileFriends;

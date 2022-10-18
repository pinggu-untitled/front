import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import AddButton from '@components/Profile/AddButton';
import PostCard from '@components/revised/Profile/PostCard';
import { IPostCard, IUser, IMe } from '@typings/db';
import CardList from '@components/revised/CardList';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import SettingsButton from '@components/revised/Profile/SettingsButton';
import SettingsModal from '@components/revised/SettingsModal';
import { FiScissors } from 'react-icons/fi';
import EditModal from '@components/revised/Profile/EditModal';
import SelectPostCard from '@components/revised/Profile/SelectPostCard';
import { v4 as uuid } from 'uuid';
import { useForm } from 'react-hook-form';
import BottomSummary from '../../components/revised/Profile/BottomSummary';
import MyPingsCard from '@components/revised/Profile/MyPingsCard';
import { Base, MainContentZone, Form } from '../ProfilePosts';
import FriendCard from '@components/revised/Profile/FriendCard';
import { useParams } from 'react-router-dom';

export interface ICheckedPost {
  id: number;
  title: string;
}

const ProfileFriends = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data: md, mutate: mutateMd } = useSWR<IMe>(`/users/me`, fetcher);
  const { data: ud, mutate: mutateUd } = useSWR<IUser[]>(`/users/${userId}`, fetcher);
  const { data: followersData, mutate: mutateFollowers } = useSWR<IUser[] | null>(
    `/users/${userId}/followers`,
    fetcher,
  );
  const { data: followeringsData, mutate: mutateFollowings } = useSWR<IUser[] | null>(
    `/users/${userId}/followings`,
    fetcher,
  );

  const [showModals, setShowModals] = useState<{ [key: string]: boolean }>({
    showSettingsModal: false,
    showEditModal: false,
  });
  const [checkedPosts, setCheckedPost] = useState<ICheckedPost[]>([]);

  const handleModal = (modalName: string) => () => {
    setShowModals((pv) => ({ ...pv, [modalName]: !pv[modalName] }));
  };

  const handleCheck = (post: ICheckedPost) => (e: any) => {
    setCheckedPost((prev) => {
      const existing = prev.find((pp) => pp.id === post.id);
      return existing ? prev.filter((pp) => pp.id !== post.id) : [...prev, { id: post.id, title: post.title }];
    });
  };

  console.log(checkedPosts);

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      console.log(checkedPosts);
    },
    [checkedPosts],
  );

  const userSettingItems = [
    { content: { icon: <FiScissors />, title: '편집하기' }, onClick: handleModal('showEditModal') },
  ];

  return (
    <>
      <Base>
        <MainContentZone>
          {!showModals.showEditModal && (
            <CardList>
              {followersData?.map((user, i) => (
                <FriendCard key={uuid()} profile={user} />
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
        {/* <EditModal
          show={showModals.showEditModal}
          onCloseModal={handleModal('showEditModal')}
          title={{ main: '내 마이핑스', count: pd?.slice(0, 10).length || 0 }}
        >
          <Form onSubmit={onSubmit}>
            <CardList>
              {?.slice(0, 10).map((post) => (
                <SelectPostCard
                  key={uuid()}
                  post={post}
                  isChecked={Boolean(checkedPosts.find((pp) => pp.id === post.id))}
                  handleCheck={handleCheck(post)}
                />
              ))}
            </CardList>
            <BottomSummary checkedPosts={checkedPosts} handleCheck={handleCheck} />
          </Form>
        </EditModal> */}
      </Base>
    </>
  );
};

export default ProfileFriends;

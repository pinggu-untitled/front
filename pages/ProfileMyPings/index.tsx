import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import AddButton from '@components/Profile/AddButton';
import PostCard from '@components/revised/Profile/PostCard';
import { IPost, IUser, IMe } from '@typings/db';
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
import { useParams } from 'react-router-dom';
import { IMyPings } from '../../typings/db';
import EmptyMessage from '@components/revised/Profile/EmptyMessage';

export interface ICheckedPost {
  id: number;
  title: string;
}

const ProfileMyPings = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data: md, mutate: mutateMd } = useSWR<IMe>('/users/me', fetcher);
  const { data: ud, mutate: mutateUd } = useSWR<IUser[]>(`/users/${userId}`, fetcher);
  const { data: mypings, mutate: mutateMypings } = useSWR<IMyPings[]>(`/users/${userId}/mypings`, fetcher);

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
          {mypings?.length ? (
            <CardList>
              {mypings?.slice(0, 10).map((ping, i) => (
                <MyPingsCard key={uuid()} mypings={ping} />
              ))}
            </CardList>
          ) : (
            <EmptyMessage message={'아직 회원님이 만든 마이핑스가 없어요.'} />
          )}
        </MainContentZone>
        <SettingsButton onClick={handleModal('showSettingsModal')} />
        <SettingsModal
          show={showModals.showSettingsModal}
          onCloseModal={handleModal('showSettingsModal')}
          items={userSettingItems}
          style={{ bottom: '80px', left: '310px' }}
        />
        <EditModal
          show={showModals.showEditModal}
          onCloseModal={handleModal('showEditModal')}
          title={{ maintitle: '내 마이핑스', highlight: mypings?.slice(0, 10).length || 0 }}
        >
          <Form onSubmit={onSubmit}>
            {/* <CardList>
              {mypings?.slice(0, 10).map((ping) => (
                <SelectPostCard
                  key={uuid()}
                  post={ping}
                  isChecked={Boolean(checkedPosts.find((pp) => pp.id === ping.id))}
                  handleCheck={handleCheck(ping)}
                />
              ))}
            </CardList> */}
            <BottomSummary checkedPosts={checkedPosts} handleCheck={handleCheck} />
          </Form>
        </EditModal>
      </Base>
    </>
  );
};

export default ProfileMyPings;

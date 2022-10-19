import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import PostCard from '@components/revised/Profile/PostCard';
import { IMe, IUser, IPost } from '@typings/db';
import CardList from '@components/revised/CardList';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import SettingsButton from '@components/revised/Profile/SettingsButton';
import SettingsModal from '@components/revised/SettingsModal';
import { FiScissors } from 'react-icons/fi';
import EditModal from '@components/revised/Profile/EditModal';
import SelectPostCard from '@components/revised/Profile/SelectPostCard';
import { v4 as uuid } from 'uuid';
import BottomSummary from '../../components/revised/Profile/BottomSummary';
import { useParams } from 'react-router-dom';
import useModals from '@utils/useModals';
import isIdExisting from '@utils/isIdExisting';

export const Base = styled.div`
  width: 100%;
  height: 100%;
`;

export const MainContentZone = styled.div`
  position: absolute;
  width: 440px;
  top: 208px;
  bottom: 0;
  overflow-y: scroll;
`;

export const Form = styled.form``;

export interface ICheckedPost {
  id: number;
  title: string;
}

const ProfilePosts = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data: md, mutate: mutateMd } = useSWR<IMe>(`/users/me`, fetcher);
  const { data: ud, mutate: mutateUd } = useSWR<IUser>(`/users/${userId}`, fetcher);
  const { data: pd, mutate: mutatePd } = useSWR<IPost[]>(ud ? `/users/${userId}/posts` : null, fetcher);
  const [showModals, handleModal] = useModals('showSettingsModal', 'showEditModal');
  const [checkedPosts, setCheckedPost] = useState<ICheckedPost[]>([]);

  const handleCheck = (post: ICheckedPost) => (e: any) => {
    setCheckedPost((prev) => {
      const existing = isIdExisting(prev, post);
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

  if (pd === undefined) return <div>로딩중...</div>;

  return (
    <>
      <Base>
        <MainContentZone>
          {!showModals.showEditModal && (
            <CardList>
              {pd?.map((post, i) => (
                <PostCard key={uuid()} post={post} />
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
        <EditModal
          show={showModals.showEditModal}
          onCloseModal={handleModal('showEditModal')}
          title={{ maintitle: '내 게시물', highlight: pd?.slice(0, 10).length || 0 }}
        >
          <Form onSubmit={onSubmit}>
            <CardList>
              {pd?.slice(0, 10).map((post) => (
                <SelectPostCard
                  key={uuid()}
                  post={post}
                  isChecked={isIdExisting(checkedPosts, post)}
                  handleCheck={handleCheck(post)}
                />
              ))}
            </CardList>
            <BottomSummary checkedPosts={checkedPosts} handleCheck={handleCheck} />
          </Form>
        </EditModal>
      </Base>
    </>
  );
};

export default ProfilePosts;

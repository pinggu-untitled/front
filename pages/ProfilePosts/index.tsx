import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import AddButton from '@components/Profile/AddButton';
import PostCard from '@components/revised/Profile/PostCard';
import { IPostCard } from '@typings/db';
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
export const Base = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

interface ISelected {
  [key: string]: boolean;
}

const ProfilePosts = () => {
  const { data: pd, mutate: mutatePd } = useSWR<IPostCard[] | null>(`/posts/all`, fetcher);

  const [showModals, setShowModals] = useState<{ [key: string]: boolean }>({
    showSettingsModal: false,
    showEditModal: false,
  });

  const [checks, setChecks] = useState<{ [key: string]: boolean }>({});

  const handleModal = (modalName: string) => () => {
    setShowModals((pv) => ({ ...pv, [modalName]: !pv[modalName] }));
  };

  const userSettingItems = [
    { content: { icon: <FiScissors />, title: '편집하기' }, onClick: handleModal('showEditModal') },
  ];

  const handleCheck = (postId: number) => (e: any) => {
    setChecks((pv) => ({ ...pv, [e.target.value]: e.target.checked }));
  };

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      console.log(checks);
      const ret = Object.entries(checks).filter(([key, value]) => value !== false);
      console.log(ret);
    },
    [checks],
  );

  if (pd === undefined) return <div>로딩중...</div>;

  return (
    <>
      <Base>
        {!showModals.showEditModal && (
          <>
            <CardList>
              {pd?.slice(0, 10).map((post, i) => (
                <PostCard key={uuid()} post={post} />
              ))}
            </CardList>
            <SettingsButton onClick={handleModal('showSettingsModal')} />
            <SettingsModal
              show={showModals.showSettingsModal}
              onCloseModal={handleModal('showSettingsModal')}
              items={userSettingItems}
              style={{ bottom: '80px', left: '310px' }}
            />
          </>
        )}
        <EditModal
          show={true || showModals.showEditModal}
          onCloseModal={handleModal('showEditModal')}
          title={{ main: '내 게시물', count: pd?.slice(0, 10).length || 0 }}
        >
          <form onSubmit={onSubmit}>
            <button type="submit">삭제</button>
            <CardList>
              {pd?.slice(0, 10).map((post) => (
                <SelectPostCard key={uuid()} post={post} checks={checks} handleCheck={handleCheck(post.id)} />
              ))}
            </CardList>
          </form>
        </EditModal>
      </Base>
    </>
  );
};

export default ProfilePosts;

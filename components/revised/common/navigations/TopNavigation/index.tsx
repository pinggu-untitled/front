import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { Base, Button } from '../DetailTopNavigation';
import { BiBell, BiSearch } from 'react-icons/bi';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineBookmarkAdd } from 'react-icons/md';

import SettingsModal from '@components/revised/SettingsModal';
import { useNavigate } from 'react-router-dom';
import SearchModal from '@components/revised/SearchModal';
import useSWR from 'swr';
import { IMe } from '@typings/db';
import fetcher from '@utils/fetcher';
import { IoIosLogOut } from 'react-icons/io';
import useModals from '@utils/useModals';

interface IProps {
  title: string;
}

export const CustomBase = styled(Base)`
  padding-left: 20px;
  > h1 {
    font-size: 18px;
  }

  > .buttonsList {
    display: flex;

    > div:not(:last-of-type) {
      margin-right: 3px;
    }
  }
`;

const TopNavigation: FC<IProps> = ({ title }) => {
  const navigate = useNavigate();
  const { data: md, mutate: mutateMd } = useSWR<IMe>('/users/me', fetcher);

  const [showModals, handleModal] = useModals('showSearchModal', 'showMenuModal', 'showAlarmModal');
  const handleNavigate = (path: string) => () => navigate(path);

  const settingsItem = [
    { content: { icon: <FiEdit />, title: '게시물 작성하기' }, onClick: handleNavigate('/posts/new') },
    { content: { icon: <MdOutlineBookmarkAdd />, title: '마이핑스 만들기' }, onClick: handleNavigate('/mypings/new') },
    { content: { icon: <AiOutlineUser />, title: '프로필 수정하기' }, onClick: handleNavigate(`/${md?.id}/edit`) },
    {
      content: { icon: <IoIosLogOut />, title: '로그아웃', rest: <a href={'http://localhost:8080/auth/logout'}></a> },
      onClick: () => {
        handleModal('showSettingsModal')();
        handleNavigate('/intro')();
      },
    },
  ];
  return (
    <CustomBase>
      <h1>{title}</h1>
      <div className={'buttonsList'}>
        <Button onClick={handleModal('showSearchModal')}>
          <BiSearch />
        </Button>
        <Button onClick={handleModal('showMenuModal')}>
          <HiOutlineViewGridAdd />
        </Button>
        <Button onClick={handleModal('showAlarmModal')}>
          <BiBell />
        </Button>
      </div>
      <SettingsModal
        show={showModals.showMenuModal}
        onCloseModal={handleModal('showMenuModal')}
        style={{ top: '60px', left: '300px' }}
        items={settingsItem}
      />
      <SearchModal show={showModals.showSearchModal} onCloseModal={handleModal('showSearchModal')} />
    </CustomBase>
  );
};

export default TopNavigation;

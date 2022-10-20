import React from 'react';
import styled from '@emotion/styled';
import TopNavigation from '@components/revised/common/navigations/TopNavigation';
import { Base, MainContentZone } from '@pages/Home';

const Chatrooms = () => {
  return (
    <Base>
      <TopNavigation title={'채팅'} />
      <MainContentZone>채팅방 리스트 나오는 곳</MainContentZone>
    </Base>
  );
};

export default Chatrooms;

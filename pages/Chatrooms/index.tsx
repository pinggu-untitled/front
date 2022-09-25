import React from 'react';
import styled from '@emotion/styled';
import TopNavigation from '@components/common/navigations/TopNavigation';

export const Base = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const MainContentZone = styled.div`
  position: absolute;
  width: 400px;
  top: 73px;
  bottom: 0;
`;

const Chatrooms = () => {
  return (
    <Base>
      <TopNavigation title={'채팅'} />
      <MainContentZone>Chatrooms</MainContentZone>
    </Base>
  );
};

export default Chatrooms;

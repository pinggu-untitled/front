import React from 'react';
import styled from '@emotion/styled';
import TopNavigation from '@components/common/navigations/TopNavigation';
import { Router } from 'react-router';

export const Base = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const MainContentZone = styled.div`
  position: absolute;
  width: 440px;
  top: 73px;
  bottom: 0;
`;

const Nickname = () => {
  return (
    <Base>
      <TopNavigation title={'마이페이지'} />
      <MainContentZone>마이페이지</MainContentZone>
    </Base>
  );
};

export default Nickname;

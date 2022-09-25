import React from 'react';
import styled from '@emotion/styled';
import TopNavigation from '@components/common/navigations/TopNavigation';
import { useNavigate } from 'react-router-dom';
import PrevButtonTitleHeader from '@components/common/headers/PrevButtonTitleHeader';

export const Base = styled.div`
  width: 100%;
  height: 100%;
`;

export const MainContentZone = styled.div`
  width: 440px;
  margin-top: 73px;
  height: calc(100vh - 73px);
`;

const Settings = () => {
  const navigate = useNavigate();
  return (
    <Base>
      <PrevButtonTitleHeader title="설정" onClick={() => navigate('/more')} />
      <MainContentZone>디테일한 설정 리스트 들어갈 예정(다크모드)</MainContentZone>
    </Base>
  );
};

export default Settings;

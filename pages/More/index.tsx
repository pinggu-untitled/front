import React from 'react';
import styled from '@emotion/styled';
import TopNavigation from '@components/common/navigations/TopNavigation';
import { useNavigate } from 'react-router-dom';

export const Base = styled.div`
  width: 100%;
  height: 100%;
`;

export const MainContentZone = styled.div`
  width: 100%;
  height: 100%;
  padding: 80px 40px;
`;

export const LoginButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  & .image-wrapper {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid gray;

    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  & span {
    color: gray;
    margin-left: 12px;
    font-size: 14px;
  }
`;

export const ActionItemListBig = styled.ul`
  width: 100%;
  margin-top: 30px;

  & li:not(:last-child) {
    border-bottom: 1px solid #dfdfdf;
  }
`;
export const ActionItemBig = styled.li`
  height: 60px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const ActionItemListSmall = styled.ul`
  width: 100%;
  margin-top: 20px;

  & li {
    margin-bottom: 5px;
  }
`;
export const ActionItemSmall = styled.li`
  font-size: 14px;
  color: gray;
  height: 28px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const More = () => {
  const navigate = useNavigate();
  return (
    <Base>
      <MainContentZone>
        <LoginButton onClick={() => navigate('/sign_in')}>
          <div className={'image-wrapper'}>
            <img src={'/placeholder.png'} />
          </div>
          <span>로그인이 필요합니다</span>
        </LoginButton>
        <ActionItemListBig>
          <ActionItemBig onClick={() => navigate('/introduce')}>서비스 소개</ActionItemBig>
          <ActionItemBig onClick={() => navigate('/settings')}>설정</ActionItemBig>
          <ActionItemBig style={{ cursor: 'default' }}>버전 정보</ActionItemBig>
        </ActionItemListBig>
        <ActionItemListSmall>
          <ActionItemSmall>공지사항</ActionItemSmall>
          <ActionItemSmall>고객 센터</ActionItemSmall>
          <ActionItemSmall>정보 수정 제안</ActionItemSmall>
          <ActionItemSmall>이용약관 및 정책</ActionItemSmall>
        </ActionItemListSmall>
      </MainContentZone>
    </Base>
  );
};

export default More;

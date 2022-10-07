import React, { FC } from 'react';
import styled from '@emotion/styled';
import { IUser } from '@typings/db';
import { useNavigate } from 'react-router-dom';

interface IProps {
  user: IUser;
  children: React.ReactNode;
}

export const Base = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
`;

export const ProfileImageWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #dfdfdf;
  overflow: hidden;
  cursor: pointer;

  & img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  & .nickname {
    font-size: 15px;
    font-weight: 600;
  }
`;

const UserProfileWrapper: FC<IProps> = ({ children, user }) => {
  const navigate = useNavigate();

  return (
    <Base>
      <ProfileImageWrapper onClick={() => navigate(`/users/${user.nickname}`)}>
        <img src={user?.profile_image_url || '/public/placeholder.png'} />
      </ProfileImageWrapper>
      <InfoWrapper className={'info'}>
        <span className={'nickname'}>{user?.nickname || '아무개'}</span>
        {children}
      </InfoWrapper>
    </Base>
  );
};

export default UserProfileWrapper;

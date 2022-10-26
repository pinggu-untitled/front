import React, { useState, FC } from 'react';
import styled from '@emotion/styled';
import ProfileAvatar from '@components/revised/common/images/ProfileAvatar';
import { IMe } from '@typings/db';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import handleNavigate from '@utils/handleNavigate';
import { useNavigate } from 'react-router-dom';

interface IProps {
  children: React.ReactNode;
}
export const Base = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;

  > .info {
    display: flex;
    flex-direction: column;
    margin-left: 10px;

    > .nickname {
      display: inline-block;
      font-size: 15px;
      font-weight: 700;
    }
  }
`;

const ProfileSummaryBar: FC<IProps> = ({ children }) => {
  const navigator = useNavigate();
  const { data: md } = useSWR<IMe>('/users/me', fetcher);
  return (
    <Base>
      <ProfileAvatar
        style={{ width: '50px', height: '50px' }}
        profile={md}
        onClick={handleNavigate(navigator, `/${md?.id}`)}
      />
      <div className={'info'}>
        <span className={'nickname'}>{md?.nickname}</span>
        {children}
      </div>
    </Base>
  );
};

export default ProfileSummaryBar;

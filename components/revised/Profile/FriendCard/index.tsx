import React, { Dispatch, FC, memo, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { IMe, IUser } from '@typings/db';
import ProfileAvatar from '@components/revised/common/images/ProfileAvatar';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import FollowActionButton from '../FollowActionButton';
import isIdExisting from '@utils/isIdExisting';
import actionHandler from '@utils/actionHandler';
import handleNavigate from '@utils/handleNavigate';

interface IProps {
  profile: IUser;
}

export const Base = styled.li`
  position: relative;
  padding: 10px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;

  > .left {
    display: flex;
    align-items: center;
    > .nickname {
      font-size: 16px;
      font-weight: 700;
      margin-left: 10px;
    }
  }
`;
export type FollowState = boolean | null;

const FriendCard: FC<IProps> = ({ profile }) => {
  const navigator = useNavigate();
  const { data: md } = useSWR<IMe>(`/users/me`, fetcher);
  const [isFollowing, setIsFollowing] = useState<FollowState>(null);

  const { data: myFollowingsData } = useSWR<IUser[]>(`/users/${md?.id}/followings`, fetcher);

  useEffect(() => {
    if (myFollowingsData) {
      setIsFollowing(isIdExisting(myFollowingsData, profile));
    }
  }, [myFollowingsData]);

  return (
    <Base onClick={handleNavigate(navigator, `/${profile.id}`)}>
      <div className={'left'}>
        <ProfileAvatar profile={profile} style={{ width: '50px', height: '50px' }} />
        <span className={'nickname'}>{profile.nickname}</span>
      </div>
      {profile.id !== md?.id && (
        <FollowActionButton
          isFollowing={isFollowing}
          onClick={actionHandler(isFollowing ? 'deactivate' : 'activate', `/follow/${profile.id}`, setIsFollowing)}
          style={{ right: '10px' }}
        />
      )}
    </Base>
  );
};

export default memo(FriendCard);

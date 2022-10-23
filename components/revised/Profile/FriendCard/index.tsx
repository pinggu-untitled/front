import React, { Dispatch, FC, memo, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { IMe, IUser } from '@typings/db';
import ProfileImage from '@components/revised/common/images/ProfileAvatar';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import FollowActionButton from '../FollowActionButton';
import isIdExisting from '@utils/isIdExisting';
import axios from 'axios';
import mutateFollow from '@utils/mutateFollow';
import followFetcher from '@utils/followFetcher';
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
  const navigate = useNavigate();
  const { data: md } = useSWR<IMe>(`/users/me`, fetcher);
  const [isFollowing, setIsFollowing] = useState<FollowState>(null);

  const { data: myFollowingsData, mutate: mutateMyFollowings } = useSWR<IUser[]>(
    `/users/${md?.id}/followings`,
    followFetcher(setIsFollowing, profile),
  );

  useEffect(() => {
    if (myFollowingsData) {
      setIsFollowing((prev) => isIdExisting(myFollowingsData, profile));
    }
  }, []);

  return (
    <Base onClick={handleNavigate(navigate, `/${profile.id}`)}>
      <div className={'left'}>
        <ProfileImage profile={profile} style={{ width: '50px', height: '50px' }} />
        <span className={'nickname'}>{profile.nickname}</span>
      </div>
      {profile.id !== md?.id && (
        <FollowActionButton
          isFollowing={isFollowing}
          onClick={mutateFollow(isFollowing, setIsFollowing, profile.id)}
          style={{ right: '10px' }}
        />
      )}
    </Base>
  );
};

export default memo(FriendCard);

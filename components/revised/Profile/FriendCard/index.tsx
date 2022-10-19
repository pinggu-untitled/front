import React, { FC, memo, useCallback } from 'react';
import styled from '@emotion/styled';
import { IMe, IUser } from '@typings/db';
import ProfileImage from '@components/revised/common/images/ProfileAvatar';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import FollowActionButton from '../FollowActionButton';
import isIdExisting from '@utils/isIdExisting';

interface IProps {
  profile: IUser;
  isFollowing: boolean;
  handleFollow: (userId: number) => (e: any) => void;
}

export const Base = styled.li`
  position: relative;
  border-bottom: 1px solid #dfdfdf;
  padding: 10px 0;
  display: flex;
  align-items: center;
  cursor: pointer;

  > .nickname {
    font-size: 16px;
    font-weight: 700;
    margin-left: 10px;
  }
`;

const FriendCard: FC<IProps> = ({ profile, isFollowing, handleFollow }) => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { data: md, mutate: mutateMd } = useSWR<IMe>(`/users/me`, fetcher);

  return (
    <Base onClick={() => navigate(`/${profile.id}`)}>
      <ProfileImage profile={profile} style={{ width: '50px', height: '50px' }} />
      <span className={'nickname'}>{profile.nickname}</span>
      {Number(userId) === md?.id && (
        <FollowActionButton isFollowing={isFollowing} onClick={handleFollow(profile.id)} style={{ right: '10px' }} />
      )}
    </Base>
  );
};

export default memo(FriendCard);

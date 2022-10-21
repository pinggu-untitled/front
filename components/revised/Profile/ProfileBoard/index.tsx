import React, { FC } from 'react';
import styled from '@emotion/styled';
import { IMe, IUser } from '@typings/db';
import ProfileImage from '@components/revised/common/images/ProfileAvatar';
import FollowActionButton from '@components/revised/Profile/FollowActionButton';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import mutateFollow from '@utils/mutateFollow';
import { useParams } from 'react-router-dom';
import isIdExisting from '@utils/isIdExisting';

interface IProps {
  profile: IUser;
}

export const Base = styled.div`
  width: 440px;
  display: flex;
  align-items: flex-start;
  padding: 20px;
  height: 160px;
`;

export const InfoZone = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  > .nickname {
    font-size: 22px;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
  }

  > .bio {
    margin-top: 6px;
    font-size: 15px;
    font-weight: 500;
    min-width: 256px;
    max-width: 256px;
    max-height: 90px;
    text-overflow: ellipsis;
  }
`;

const ProfileBoard: FC<IProps> = ({ profile }) => {
  const { userId } = useParams<{ userId: string }>();
  const { data: md, mutate: mutateMd } = useSWR<IMe>('/users/me', fetcher);
  const { data: myFollowingsData, mutate: mutateMyFollowings } = useSWR<IUser[]>(
    `/users/${md?.id}/followings`,
    fetcher,
  );

  const handleFollow = (userId: number, mutateFn: any) => (e: any) => {
    if (myFollowingsData) {
      mutateFollow(isIdExisting(myFollowingsData, profile) ? 'unFollow' : 'follow')(userId, mutateFn)(e);
    }
  };

  if (myFollowingsData === undefined) <div>로딩중...</div>;

  return (
    <Base>
      <ProfileImage profile={profile} style={{ width: '120px', height: '120px' }} />
      <InfoZone>
        <div className="nickname">
          {profile.nickname}
          {myFollowingsData && Number(userId) !== md?.id && (
            <FollowActionButton
              isFollowing={isIdExisting(myFollowingsData, profile)}
              onClick={handleFollow(profile.id, mutateMyFollowings)}
              style={{ position: 'relative' }}
            />
          )}
        </div>
        {profile.bio && (
          <p className="bio">
            {profile.bio.slice(0, 100)} {profile.bio.length >= 100 ? '...' : null}
          </p>
        )}
      </InfoZone>
    </Base>
  );
};

export default ProfileBoard;

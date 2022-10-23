import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { IMe, IUser } from '@typings/db';
import ProfileImage from '@components/revised/common/images/ProfileAvatar';
import FollowActionButton from '@components/revised/Profile/FollowActionButton';
import { Base as FollowActionButtonBase } from '@components/revised/Profile/FollowActionButton';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import mutateFollow from '@utils/mutateFollow';
import { useNavigate, useParams } from 'react-router-dom';
import isIdExisting from '@utils/isIdExisting';
import { FollowState } from '@components/revised/Profile/FriendCard';
import followFetcher from '@utils/followFetcher';
import handleNavigate from '@utils/handleNavigate';

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
  width: auto;
  margin-left: 20px;

  > .nickname-and-action {
    font-size: 22px;
    font-weight: 700;
    display: flex;
    width: 100%;
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

export const EditProfileButton = styled(FollowActionButtonBase)`
  padding: 6px 10px;
  border: 1px solid #1974e4;
  border-radius: 4px;
`;

const ProfileBoard: FC<IProps> = ({ profile }) => {
  const navigator = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { data: md } = useSWR<IMe>('/users/me', fetcher);

  const [isFollowing, setIsFollowing] = useState<FollowState>(null);

  const { data: myFollowingsData } = useSWR<IUser[]>(
    `/users/${md?.id}/followings`,
    followFetcher(setIsFollowing, profile),
  );

  useEffect(() => {
    if (myFollowingsData) {
      setIsFollowing((prev) => isIdExisting(myFollowingsData, profile));
    }
  }, []);

  return (
    <Base>
      <ProfileImage profile={profile} style={{ width: '120px', height: '120px' }} />
      <InfoZone>
        <div className="nickname-and-action">
          {profile.nickname}
          {Number(userId) === md?.id ? (
            <EditProfileButton onClick={handleNavigate(navigator, `/${profile.id}/edit`)}>
              프로필 수정
            </EditProfileButton>
          ) : (
            <FollowActionButton
              isFollowing={isFollowing}
              onClick={mutateFollow(isFollowing, setIsFollowing, profile.id)}
              style={{ right: '10px' }}
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

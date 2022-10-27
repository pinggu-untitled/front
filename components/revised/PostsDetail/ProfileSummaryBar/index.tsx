import React, { FC, useEffect, useState } from 'react';
import { IMe, IPost, IUser } from '@typings/db';
import styled from '@emotion/styled';
import ProfileImage from '@components/revised/common/images/ProfileAvatar';
import { useNavigate, useParams } from 'react-router-dom';
import handleNavigate from '@utils/handleNavigate';
import FollowActionButton from '@components/revised/Profile/FollowActionButton';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import isIdExisting from '@utils/isIdExisting';
import PillBox from '@components/revised/PillBox';
import { FollowState } from '@components/revised/Profile/FriendCard';
import actionHandler from '@utils/actionHandler';

interface IProps {
  profile: IUser;
}

export const Base = styled.div`
  width: 100%;
  position: sticky;
  padding: 6px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  > .left {
    display: flex;
    align-items: center;
    > .nickname {
      display: inline-block;
      font-size: 15px;
      font-weight: 700;
      margin-left: 10px;
    }
  }
`;
const ProfileSummaryBar: FC<IProps> = ({ profile }) => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const { data: md } = useSWR<IMe>('/users/me', fetcher);
  const { data: pd } = useSWR<IPost>(`/posts/${postId}`, fetcher);
  const [isFollowing, setIsFollowing] = useState<FollowState>(null);

  const { data: myFollowingsData, mutate: mutateMyFollowings } = useSWR<IUser[]>(
    `/users/${md?.id}/followings`,
    fetcher,
  );

  useEffect(() => {
    if (myFollowingsData) {
      setIsFollowing((prev) => isIdExisting(myFollowingsData, profile));
    }
  }, [myFollowingsData]);

  return (
    <Base>
      <div className={'left'}>
        <ProfileImage
          profile={profile}
          onClick={handleNavigate(navigate, `/${profile?.id}`)}
          style={{ width: '40px', height: '40px' }}
        />
        <span className={'nickname'}>{profile?.nickname}</span>
      </div>
      {md?.id === pd?.User.id ? (
        <PillBox text={'내 게시물'} />
      ) : (
        <FollowActionButton
          isFollowing={isFollowing}
          onClick={actionHandler(isFollowing ? 'activate' : 'deactivate', `/follow/${profile.id}`, setIsFollowing)}
          style={{ right: '10px' }}
        />
      )}
    </Base>
  );
};

export default ProfileSummaryBar;

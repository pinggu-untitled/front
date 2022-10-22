import React, { FC, useEffect, useState } from 'react';
import { IMe, IPost, IUser } from '@typings/db';
import styled from '@emotion/styled';
import ProfileImage from '@components/revised/common/images/ProfileAvatar';
import { useNavigate, useParams } from 'react-router-dom';
import handleNavigate from '@utils/handleNavigate';
import FollowActionButton from '@components/revised/Profile/FollowActionButton';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import mutateFollow from '@utils/mutateFollow';
import isIdExisting from '@utils/isIdExisting';
import PillBox from '@components/revised/PillBox';
import { FollowState } from '@components/revised/Profile/FriendCard';

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
  const { data: md, mutate: mutateMd } = useSWR<IMe>('/users/me', fetcher);
  const { data: pd, mutate: mutatePd } = useSWR<IPost>(`/posts/${postId}`, fetcher);
  const { data: myFollowingsData, mutate: mutateMyFollowings } = useSWR<IUser[]>(
    `/users/${md?.id}/followings`,
    fetcher,
  );
<<<<<<< HEAD

  const [isFollowing, setIsFollowing] = useState<FollowState>(null);

  useEffect(() => {
    if (myFollowingsData) {
      setIsFollowing((prev) => isIdExisting(myFollowingsData, profile));
    }
  }, []);
=======
  const [following, setFollowing] = useState<boolean | null>(null);
  useEffect(() => {
    setFollowing((prev) => {
      return myFollowingsData && isIdExisting(myFollowingsData, profile) ? true : false;
    });
  }, [profile, setFollowing]);
>>>>>>> b280f8d1721b202e18721de1b6b6add9f06ca73b

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
<<<<<<< HEAD
        <FollowActionButton
          isFollowing={isFollowing}
          onClick={mutateFollow(isFollowing, setIsFollowing, profile.id)}
          style={{ right: '10px' }}
        />
=======
        myFollowingsData &&
        pd && (
          <FollowActionButton
            isFollowing={isIdExisting(myFollowingsData, profile)}
            onClick={(e) => {
              e.stopPropagation();
              mutateFollow(setFollowing, pd?.User.id);
            }}
            style={{ position: 'relative' }}
          />
        )
>>>>>>> b280f8d1721b202e18721de1b6b6add9f06ca73b
      )}
    </Base>
  );
};

export default ProfileSummaryBar;

<<<<<<< HEAD
import React, { Dispatch, FC, memo, useEffect, useState } from 'react';
=======
import React, { Dispatch, FC, memo, useState } from 'react';
>>>>>>> b280f8d1721b202e18721de1b6b6add9f06ca73b
import styled from '@emotion/styled';
import { IMe, IUser } from '@typings/db';
import ProfileImage from '@components/revised/common/images/ProfileAvatar';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import FollowActionButton from '../FollowActionButton';
<<<<<<< HEAD
import isIdExisting from '@utils/isIdExisting';
import axios from 'axios';
import mutateFollow from '@utils/mutateFollow';

interface IProps {
  profile: IUser;
=======
import mutateFollow from '@utils/mutateFollow';

interface IProps {
  user: IUser;
  isFollowing: boolean;
  // handleFollow: (userId: number, mutateFn: any) => (e: any) => void;
  rerender?: Dispatch<React.SetStateAction<any>>;
>>>>>>> b280f8d1721b202e18721de1b6b6add9f06ca73b
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

<<<<<<< HEAD
const FriendCard: FC<IProps> = ({ profile }) => {
=======
const FriendCard: FC<IProps> = ({ user, isFollowing, rerender }) => {
>>>>>>> b280f8d1721b202e18721de1b6b6add9f06ca73b
  const navigate = useNavigate();
  const handleNavigate = (path: string) => () => navigate(path);
  const { userId } = useParams<{ userId: string }>();
  const { data: md, mutate: mutateMd } = useSWR<IMe>(`/users/me`, fetcher);
<<<<<<< HEAD
  const [isFollowing, setIsFollowing] = useState<FollowState>(null);

  const followFetcher = (url: string) => {
    return axios.get(url).then((res) => {
      setIsFollowing((prev) => isIdExisting(res.data, profile));
      return res.data;
    });
  };

  const { data: myFollowingsData, mutate: mutateMyFollowings } = useSWR<IUser[]>(
    `/users/${md?.id}/followings`,
    followFetcher,
  );
  //

  useEffect(() => {
    if (myFollowingsData) {
      setIsFollowing((prev) => isIdExisting(myFollowingsData, profile));
    }

    // return  () => mutateMyFollowings();
  }, []);

  return (
    // <Base onClick={handleNavigate(`/${profile.id}`)}>
=======
  const [following, setFollowing] = useState<boolean | null>(isFollowing);
  return (
    // <Base onClick={handleNavigate(`/${user.id}`)}>
>>>>>>> b280f8d1721b202e18721de1b6b6add9f06ca73b
    <Base>
      <div className={'left'}>
        <ProfileImage profile={profile} style={{ width: '50px', height: '50px' }} />
        <span className={'nickname'}>{profile.nickname}</span>
      </div>
<<<<<<< HEAD
      {profile.id !== md?.id && (
        <FollowActionButton
          isFollowing={isFollowing}
          onClick={mutateFollow(isFollowing, setIsFollowing, profile.id)}
=======

      {user.id !== md?.id && following !== null && (
        <FollowActionButton
          isFollowing={following}
          onClick={(e) => {
            e.stopPropagation();
            mutateFollow(setFollowing, user.id);
            // handleFollow(user.id, mutateMd)(e);
            // setFollowing((prev) => {
            //   if (prev) {
            //     //언팔
            //     axios
            //       .delete(`/follow/${user.id}`)
            //       .then((res) => console.log(res.data))
            //       .catch((err) => console.error(err));
            //   } else {
            //     axios
            //       .post(`/follow/${user.id}`)
            //       .then((res) => console.log(res.data))
            //       .catch((err) => console.error(err));
            //   }
            // return !prev;
            // });
            // rerender(undefined);
          }}
>>>>>>> b280f8d1721b202e18721de1b6b6add9f06ca73b
          style={{ right: '10px' }}
        />
      )}
    </Base>
  );
};

export default memo(FriendCard);

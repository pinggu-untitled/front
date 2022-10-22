import React from 'react';
import axios from 'axios';
import { Dispatch } from 'react';
import { FollowState } from '@components/revised/Profile/FriendCard';

const unFollowFn = (setIsFollowing: Dispatch<React.SetStateAction<FollowState>>, userId: number) => {
  axios
    .delete(`/follow/${userId}`)
    .then((res) => {
      console.log('unfollow>>>', res.data);
      setIsFollowing(false);
    })
    .catch((error) => console.error(error));
};
const followFn = (setIsFollowing: Dispatch<React.SetStateAction<FollowState>>, userId: number) => {
  axios.post(`/follow/${userId}`).then((res) => {
    console.log('follow>>>', res.data);
    setIsFollowing(true);
  });
};

const mutateFollow =
  (isFollowing: FollowState, setIsFollowing: Dispatch<React.SetStateAction<FollowState>>, userId: number) =>
  (e: any) => {
    isFollowing ? unFollowFn(setIsFollowing, userId) : followFn(setIsFollowing, userId);
  };

export default mutateFollow;

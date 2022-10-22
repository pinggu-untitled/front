import React from 'react';
import axios from 'axios';
<<<<<<< HEAD
import { Dispatch } from 'react';
import { FollowState } from '@components/revised/Profile/FriendCard';

const unFollowFn = (setIsFollowing: Dispatch<React.SetStateAction<FollowState>>, userId: number) => {
  axios
    .delete(`/follow/${userId}`)
    .then((res) => {
      console.log('unfollow>>>', res.data);
      setIsFollowing(false);
=======
import React, { Dispatch } from 'react';

const followFn = (userId: number) => {
  axios
    .post(`/follow/${userId}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.error(err));
};

const unFollowFn = (userId: number) => {
  axios
    .delete(`/follow/${userId}`)
    .then((res) => {
      console.log(res.data);
>>>>>>> b280f8d1721b202e18721de1b6b6add9f06ca73b
    })
    .catch((error) => console.error(error));
};
<<<<<<< HEAD
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

=======

const mutateFollow = (setState: Dispatch<React.SetStateAction<boolean | null>>, userId: number) => {
  setState((prev) => {
    console.log('mutateFollow >>> ', prev);
    prev ? unFollowFn(userId) : followFn(userId);
    return !prev;
  });
};
>>>>>>> b280f8d1721b202e18721de1b6b6add9f06ca73b
export default mutateFollow;

import axios from 'axios';
import { TFollow } from '@pages/ProfileFriends';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const stopPropagation = (e: any) => {
  e.stopPropagation();
};

const followFn = (userId: number, mutateFn: any) => {
  axios
    .post(`/follow/${userId}`)
    .then((res) => {
      console.log(res.data);
      mutateFn();
    })
    .catch((err) => console.error(err));
};

const unFollowFn = (userId: number, mutateFn: any) => {
  axios
    .delete(`/follow/${userId}`)
    .then((res) => {
      console.log(res.data);
      mutateFn();
    })
    .catch((err) => console.error(err));
};

const mutateFollow = (target: TFollow) => (userId: number, mutateFn: any) => (e: any) => {
  stopPropagation(e);
  target === 'following' ? unFollowFn(userId, mutateFn) : followFn(userId, mutateFn);
};

export default mutateFollow;

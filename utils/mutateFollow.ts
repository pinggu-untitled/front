import axios from 'axios';
import { TFollow } from '@pages/ProfileFriends';

const stopPropagation = (e: any) => {
  e.stopPropagation();
};

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
    })
    .catch((err) => console.error(err));
};

const mutateFollow = (target: TFollow) => (userId: number) => (e: any) => {
  stopPropagation(e);
  target === 'following' ? unFollowFn(userId) : followFn(userId);
};

export default mutateFollow;

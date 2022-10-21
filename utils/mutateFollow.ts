import axios from 'axios';
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
    })
    .catch((err) => console.error(err));
};

const mutateFollow = (setState: Dispatch<React.SetStateAction<boolean | null>>, userId: number) => {
  setState((prev) => {
    console.log('mutateFollow >>> ', prev);
    prev ? unFollowFn(userId) : followFn(userId);
    return !prev;
  });
};
export default mutateFollow;

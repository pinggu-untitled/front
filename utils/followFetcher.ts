import axios from 'axios';
import isIdExisting from '@utils/isIdExisting';
import { IUser } from '@typings/db';
import { FollowState } from '@components/revised/Profile/FriendCard';
import { Dispatch, SetStateAction } from 'react';

const followFetcher = (setIsFollowing: Dispatch<SetStateAction<FollowState>>, profile: IUser) => (url: string) => {
  return axios.get(url).then((res) => {
    setIsFollowing((prev) => isIdExisting(res.data, profile));
    return res.data;
  });
};

export default followFetcher;

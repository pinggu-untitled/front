import React, { Dispatch, FC, memo, useState } from 'react';
import styled from '@emotion/styled';
import { IMe, IUser } from '@typings/db';
import ProfileImage from '@components/revised/common/images/ProfileAvatar';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import FollowActionButton from '../FollowActionButton';
import mutateFollow from '@utils/mutateFollow';

interface IProps {
  user: IUser;
  isFollowing: boolean;
  // handleFollow: (userId: number, mutateFn: any) => (e: any) => void;
  rerender?: Dispatch<React.SetStateAction<any>>;
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

const FriendCard: FC<IProps> = ({ user, isFollowing, rerender }) => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => () => navigate(path);
  const { userId } = useParams<{ userId: string }>();
  const { data: md, mutate: mutateMd } = useSWR<IMe>(`/users/me`, fetcher);
  const [following, setFollowing] = useState<boolean | null>(isFollowing);
  return (
    // <Base onClick={handleNavigate(`/${user.id}`)}>
    <Base>
      <div className={'left'}>
        <ProfileImage profile={user} style={{ width: '50px', height: '50px' }} />
        <span className={'nickname'}>{user.nickname}</span>
      </div>

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
          style={{ right: '10px' }}
        />
      )}
    </Base>
  );
};

export default memo(FriendCard);

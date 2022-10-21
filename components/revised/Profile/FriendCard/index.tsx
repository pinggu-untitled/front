import React, { Dispatch, FC, memo } from 'react';
import styled from '@emotion/styled';
import { IMe, IUser } from '@typings/db';
import ProfileImage from '@components/revised/common/images/ProfileAvatar';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import FollowActionButton from '../FollowActionButton';

interface IProps {
  user: IUser;
  isFollowing: boolean;
  handleFollow: (userId: number, mutateFn: any) => (e: any) => void;
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

const FriendCard: FC<IProps> = ({ user, isFollowing, handleFollow, rerender }) => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => () => navigate(path);
  const { userId } = useParams<{ userId: string }>();
  const { data: md, mutate: mutateMd } = useSWR<IMe>(`/users/me`, fetcher);

  return (
    <Base onClick={handleNavigate(`/${user.id}`)}>
      <div className={'left'}>
        <ProfileImage profile={user} style={{ width: '50px', height: '50px' }} />
        <span className={'nickname'}>{user.nickname}</span>
      </div>

      {user.id !== md?.id && (
        <FollowActionButton
          isFollowing={isFollowing}
          onClick={(e) => {
            handleFollow(user.id, mutateMd)(e);
            // rerender(undefined);
          }}
          style={{ right: '10px' }}
        />
      )}
    </Base>
  );
};

export default memo(FriendCard);

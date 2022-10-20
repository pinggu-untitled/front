import React, { FC } from 'react';
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
import { InfoZone } from '@components/revised/Profile/ProfileBoard';
import PillBox from '@components/revised/PillBox';

interface IProps {
  profile: IUser;
}

export const Base = styled.div`
  width: 100%;
  position: relative;
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
  const { data: followingsData, mutate: mutateFollowings } = useSWR<IUser[]>(`/users/${md?.id}/followings`, fetcher);

  const handleFollow = (userId: number, mutateFn: any) => (e: any) =>
    mutateFollow(isIdExisting(followingsData, profile) ? 'following' : 'follower')(userId, mutateFn)(e);

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
        <FollowActionButton
          isFollowing={isIdExisting(followingsData, profile)}
          onClick={handleFollow(profile.id, mutateFollowings)}
          style={{ position: 'relative' }}
        />
      )}
    </Base>
  );
};

export default ProfileSummaryBar;

// console.log(profile);
// return (
//   <Base>
//     <ProfileImage profile={profile} style={{ width: '120px', height: '120px' }} />
//     <InfoZone>
//       <div className="nickname">
//         {profile.nickname}
//         {Number(userId) !== md?.id && (
//           <FollowActionButton
//             isFollowing={isIdExisting(followingsData, profile)}
//             onClick={handleFollow(profile.id, mutateFollowings)}
//             style={{ position: 'relative' }}
//           />
//         )}
//       </div>
//       {profile.bio && (
//         <p className="bio">
//           {profile.bio.slice(0, 100)} {profile.bio.length >= 100 ? '...' : null}
//         </p>
//       )}
//     </InfoZone>
//   </Base>
// );

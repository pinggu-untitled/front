import React, { FC, memo, useCallback } from 'react';
import styled from '@emotion/styled';
import { IUser, IPost } from '@typings/db';
import PostImage from '@components/revised/common/images/PostImage';
import ProfileImage from '@components/revised/common/images/ProfileAvatar';
import { useNavigate } from 'react-router-dom';
import ProfilePreviewBubble from '../ProfilePreviewBubble';
import { Base, ImageZone, InfoZone } from '../PostCard';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

interface IProps {
  profile: IUser;
}

export const InfoZoneModified = styled(InfoZone)`
  padding: 10px 0;

  > p {
    margin-top: 5px;
  }
`;

const ProfileCard: FC<IProps> = ({ profile }) => {
  const navigate = useNavigate();
  const { data: ud, mutate: mutateUd } = useSWR<IUser[]>(`/users/${profile.id}/followers`, fetcher);
  const { data: pd, mutate: mutatePd } = useSWR<IPost[]>(`/users/${profile.id}/posts`, fetcher);
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const handleNavigate = (path: string) => () => navigate(path);

  return (
    <Base onClick={handleNavigate(`/${profile.id}`)}>
      <ImageZone>
        <ProfileImage profile={profile} style={{ width: '70px', height: '70px' }} />
      </ImageZone>
      <InfoZoneModified>
        <h2>{profile.nickname}</h2>
        <p>
          팔로우 {ud?.length}명 · 게시물 {pd?.length}개
        </p>
      </InfoZoneModified>
    </Base>
  );
};

export default memo(ProfileCard);

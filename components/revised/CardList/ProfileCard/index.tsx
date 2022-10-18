import React, { FC, memo, useCallback } from 'react';
import styled from '@emotion/styled';
import { IUser } from '@typings/db';
import PostImage from '@components/revised/common/images/PostImage';
import ProfileImage from '@components/revised/common/images/ProfileImage';
import { useNavigate } from 'react-router-dom';
import ProfilePreviewBubble from '../ProfilePreviewBubble';
import { Base, ImageZone, InfoZone } from '../PostCard';

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
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <Base onClick={() => navigate(`/${profile.id}`)}>
      <ImageZone>
        <ProfileImage profile={profile} style={{ width: '70px', height: '70px' }} />
      </ImageZone>
      <InfoZoneModified>
        <h2>{profile.nickname}</h2>
        <p>
          팔로우 {1}명 · 게시물 {1}개
        </p>
      </InfoZoneModified>
    </Base>
  );
};

export default memo(ProfileCard);

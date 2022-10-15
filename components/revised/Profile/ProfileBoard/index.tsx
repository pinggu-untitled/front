import React, { FC } from 'react';
import styled from '@emotion/styled';
import { IUser } from '@typings/db';
import ProfileImage from '@components/revised/common/images/ProfileImage';
interface IProps {
  profile: { id: number; nickname: string; profile_image_url: string; bio?: string };
}
export const Base = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;

  > .nickname {
    font-size: 17px;
    font-weight: 700;
    margin-top: 16px;
  }

  > .bio {
    margin-top: 6px;
    font-size: 15px;
    font-weight: 500;
  }
`;

const ProfileBoard: FC<IProps> = ({ profile }) => {
  return (
    <Base>
      <ProfileImage profile={profile} style={{ width: '100px', height: '100px' }} />
      <span className="nickname">{profile.nickname}</span>
      {profile.bio && <p className="bio">{profile.bio}</p>}
    </Base>
  );
};

export default ProfileBoard;

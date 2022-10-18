import React, { FC } from 'react';
import styled from '@emotion/styled';
import { IUser } from '@typings/db';
import ProfileImage from '@components/revised/common/images/ProfileImage';

interface IProps {
  profile: IUser;
}

export const Base = styled.div`
  width: 440px;
  display: flex;
  align-items: flex-start;
  padding: 20px;
`;

export const InfoZone = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  > .nickname {
    font-size: 22px;
    font-weight: 700;
    margin-top: 16px;
  }

  > .bio {
    margin-top: 6px;
    font-size: 15px;
    font-weight: 500;
    min-width: 200px;
    text-overflow: ellipsis;
  }
`;

const ProfileBoard: FC<IProps> = ({ profile }) => {
  return (
    <Base>
      <ProfileImage profile={profile} style={{ width: '120px', height: '120px' }} />
      <InfoZone>
        <span className="nickname">{profile.nickname}</span>
        {profile.bio && <p className="bio">{profile.bio.slice(0, 40)}</p>}
      </InfoZone>
    </Base>
  );
};

export default ProfileBoard;

import React, { FC, CSSProperties, memo } from 'react';
import { IImage, IUser } from '@typings/db';
import styled from '@emotion/styled';

interface IProps {
  profile: IUser;
  style?: CSSProperties;
}

export const Base = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

const ProfileImage: FC<IProps> = ({ profile, style }) => {
  return (
    <Base style={style}>
      <img src={profile.profile_image_url || '/public/placeholder.png'} alt={`${profile.id}`} />
    </Base>
  );
};

export default memo(ProfileImage);

import React, { FC, CSSProperties, memo } from 'react';
import { IImage, IUser } from '@typings/db';
import styled from '@emotion/styled';

interface IProps {
  profile: IUser;
  style?: CSSProperties;
  onClick?: any;
}

export const Base = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #dfdfdf;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ProfileImage: FC<IProps> = ({ profile, style, onClick }) => {
  return (
    <Base style={style} onClick={onClick}>
      <img src={profile.profile_image_url || '/public/placeholder.png'} alt={`${profile.nickname}`} />
    </Base>
  );
};

export default memo(ProfileImage);

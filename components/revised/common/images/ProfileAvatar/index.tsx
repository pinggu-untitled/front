import React, { FC, CSSProperties, memo } from 'react';
import { IUser, IMe } from '@typings/db';
import styled from '@emotion/styled';

interface IProps {
  profile?: IUser | IMe;
  style?: CSSProperties;
  onClick?: any;
}

export const Base = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #dfdfdf;
  position: relative;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileImage: FC<IProps> = ({ profile, style, onClick }) => {
  // console.log('profile???', `http://localhost:8080/uploads/profile/${profile?.profile_image_url}`);

  // if (!profile?.profile_image_url) return <div>로딩중</div>;

  return (
    <Base style={style} onClick={onClick}>
      <img
        src={
          profile?.profile_image_url.startsWith('http://k.kakaocdn.net')
            ? profile?.profile_image_url
            : `http://localhost:8080/uploads/profile/${profile?.profile_image_url}` || '/public/placeholder.png'
        }
        alt={`${profile?.nickname}님의 사진 안나옴`}
      />
    </Base>
  );
};

export default memo(ProfileImage);

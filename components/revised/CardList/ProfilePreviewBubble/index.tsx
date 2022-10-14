import React, { FC, memo } from 'react';
import styled from '@emotion/styled';
import { IPostCard, IUser } from '@typings/db';
import PostImage from '@components/revised/common/images/PostImage';
import ProfileImage from '@components/revised/common/images/ProfileImage';
import { useNavigate } from 'react-router-dom';

interface IProps {
  profile: IUser;
}
export const Base = styled.div`
  position: relative;
  /* width: 120px; */
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 4px;
  white-space: nowrap;

  > h4 {
    font-size: 12px;
    font-weight: 600;
  }

  > .more {
    font-size: 11px;
    color: skyblue;
    text-decoration: underline;
    font-weight: 600;
    margin-top: 5px;
    cursor: pointer;
  }
`;

const ProfilePreviewBubble: FC<IProps> = ({ profile }) => {
  const navigate = useNavigate();

  return (
    <Base>
      <h4>{profile.nickname}</h4>
      <span className="more" onClick={() => navigate(`/${profile.nickname}`)}>
        프로필 보기
      </span>
    </Base>
  );
};

export default memo(ProfilePreviewBubble);

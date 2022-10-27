import React, { CSSProperties, FC, useState } from 'react';
import styled from '@emotion/styled';
import { FollowState } from '@components/revised/Profile/FriendCard';

interface IProps {
  isFollowing: FollowState;
  style?: CSSProperties;
  onClick: any;
}

export const Base = styled.button`
  font-size: 13px;
  font-weight: 700;
  color: #1974e4;
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-left: 20px;
`;

const FollowActionButton: FC<IProps> = ({ isFollowing, onClick, style }) => {
  return (
    <Base style={style} onClick={onClick}>
      {isFollowing ? '팔로우 취소' : '팔로우'}
    </Base>
  );
};
export default FollowActionButton;

import React, { CSSProperties, FC } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
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
  //position: absolute;

  &:hover {
    text-decoration: underline;
  }
`;

const FollowActionButton: FC<IProps> = ({ isFollowing, onClick, style }) => {
  const clickAction = (e: any) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <Base style={style} onClick={clickAction}>
      {isFollowing ? '팔로우 취소' : '팔로우'}
    </Base>
  );
};
export default FollowActionButton;

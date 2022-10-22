import React, { CSSProperties, FC, useState } from 'react';
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
<<<<<<< HEAD
  const clickAction = (e: any) => {
    e.stopPropagation();
    onClick();
  };

=======
  const [following, setFollowing] = useState<boolean>(isFollowing);
  // const handleClick = (e: any) => {
  //   onClick(e);
  //   // setFollowing((prev) => !prev);
  // };
>>>>>>> b280f8d1721b202e18721de1b6b6add9f06ca73b
  return (
    <Base style={style} onClick={clickAction}>
      {isFollowing ? '팔로우 취소' : '팔로우'}
    </Base>
  );
};
export default FollowActionButton;

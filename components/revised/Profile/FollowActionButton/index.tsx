import React, { CSSProperties, FC, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

interface IProps {
  isFollowing: boolean;
  style?: CSSProperties;
  onClick: (e: any) => void;
}

export const Base = styled.button`
  font-size: 13px;
  font-weight: 700;
  color: #1974e4;
  border: none;
  background-color: transparent;
  cursor: pointer;
  //position: absolute;
`;

const FollowActionButton: FC<IProps> = ({ isFollowing, onClick, style }) => {
  const [following, setFollowing] = useState<boolean>(isFollowing);
  // const handleClick = (e: any) => {
  //   onClick(e);
  //   // setFollowing((prev) => !prev);
  // };
  return (
    <Base style={style} onClick={onClick}>
      {isFollowing ? '팔로우 취소' : '팔로우'}
    </Base>
  );
};
export default FollowActionButton;

import React, { FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  isClicked: boolean;
  onClick: () => void;
}

export const Base = styled.div`
  color: #0295f6;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

const FollowButton: FC<IProps> = ({ isClicked, onClick }) => {
  return <Base onClick={onClick}>{isClicked ? '팔로우' : '팔로우 취소'}</Base>;
};

export default FollowButton;

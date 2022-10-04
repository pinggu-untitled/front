import React, { CSSProperties, FC, memo, useMemo } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

interface IProps {
  src: string;
  nickname: string;
  style?: CSSProperties;
}

export const Base = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #dfdfdf;
  overflow: hidden;
  background-color: #fff;

  & img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

const ProfileImageWrapper: FC<IProps> = ({ src, nickname, style }) => {
  return (
    <Base style={useMemo(() => style, [])}>
      <img src={src || '/public/placeholder.png'} />
    </Base>
  );
};

export default memo(ProfileImageWrapper);

import React, { CSSProperties, FC } from 'react';
import styled from '@emotion/styled';
import { IImage } from '@typings/db';

interface IProps {
  src?: string;
  alt?: number | string;
  style?: CSSProperties;
}

export const Base = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #dfdfdf;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PostImage: FC<IProps> = ({ src, alt, style }) => {
  const baseUrl = 'http://localhost:8080/uploads';
  return (
    <Base style={style}>
      <img src={src ? `${baseUrl}/${src}` : 'public/placeholder.png'} alt={`${alt}` || 'placeholder.png'} />
    </Base>
  );
};

export default PostImage;

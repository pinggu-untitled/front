import React, { FC } from 'react';
import styled from '@emotion/styled';

export const Base = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

interface IProps {
  src: string;
}
const PostImage: FC<IProps> = ({ src }) => {
  const baseUrl = 'http://localhost:8080/uploads';

  return (
    <Base>
      <img src={`${baseUrl}/${src}`} alt={src} />
    </Base>
  );
};

export default PostImage;

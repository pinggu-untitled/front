import React, { FC } from 'react';
import styled from '@emotion/styled';

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

interface IProps {
  src: string | undefined;
}
const PostImage: FC<IProps> = ({ src }) => {
  return (
    <Base>
      <img src={src} alt={''} />
    </Base>
  );
};

export default PostImage;

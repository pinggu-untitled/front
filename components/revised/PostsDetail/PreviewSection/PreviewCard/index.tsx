import React, { FC } from 'react';
// import { Base, ImageWrapper } from './styles';
import { IMyPings, IPost } from '@typings/db';
import handleNavigate from '@utils/handleNavigate';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

interface IProps {
  post: IPost;
}

export const Base = styled.div`
  > p {
    font-size: 14px;
    font-weight: 600;
    padding: 0 4px;
    margin-top: 4px;
  }
`;
export const ImageWrapper = styled.div`
  height: 120px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PreviewCard: FC<IProps> = ({ post }) => {
  const navigate = useNavigate();
  if (!post) return <div>로딩중..</div>;
  return (
    <Base onClick={handleNavigate(navigate, `/posts/${post.id}`)}>
      <ImageWrapper>
        <img
          src={
            post?.Images.length > 0 ? `http://localhost:8080/uploads/${post?.Images[0].src}` : '/public/placeholder.png'
          }
          alt={post?.Images.length > 0 ? `${post?.Images[0].id}` : 'placholder.png'}
        />
      </ImageWrapper>
      <p className="title">{post.title}</p>
    </Base>
  );
};

export default PreviewCard;

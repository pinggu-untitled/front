import React, { FC } from 'react';
import { Base, ImageWrapper } from './styles';
import { IMyPings, IPost } from '@typings/db';

interface IProps {
  post: IPost;
}

const PreviewCard: FC<IProps> = ({ post }) => {
  if (!post) return <div>로딩중..</div>;
  return (
    <Base>
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

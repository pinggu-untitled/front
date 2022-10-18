import React, { FC, memo, useCallback } from 'react';
import styled from '@emotion/styled';
import { IPostCard } from '@typings/db';
import PostImage from '@components/revised/common/images/PostImage';
import ProfileImage from '@components/revised/common/images/ProfileImage';
import { useNavigate } from 'react-router-dom';
import ProfilePreviewBubble from '../ProfilePreviewBubble';

interface IProps {
  post: IPostCard;
}
export const Base = styled.li`
  border-bottom: 1px solid #dfdfdf;
  padding: 10px 0;
  position: relative;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
`;

export const ImageZone = styled.div`
  position: relative;
  display: inline-block;
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ShowTotals = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 13px;
  color: lightgray;
  padding: 3px 8px 1px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.7);

  > .current {
    color: #fff;
  }
`;

export const InfoZone = styled.div`
  margin-left: 10px;
  padding: 5px 0;

  > h2 {
    font-size: 16px;
  }

  > p {
    font-size: 13px;
    color: gray;
  }
`;

export const AuthorZone = styled.div`
  position: absolute;
  bottom: 10px;
  right: 0;
  display: inline-block;

  > .hidden {
    position: absolute;
    right: 36px;
    top: 0px;
    opacity: 0;
    visibility: hidden;
    transition: 0.2s;
  }

  &:hover {
    .hidden {
      opacity: 1;
      visibility: visible;
    }
  }
`;
const PostCard: FC<IProps> = ({ post }) => {
  const navigate = useNavigate();
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <Base onClick={() => navigate(`/posts/${post.id}`)}>
      <ImageZone>
        {post.Images.length > 0 && (
          <ShowTotals>
            <span className="current">{1}</span>/{post.Images.length}
          </ShowTotals>
        )}
        <PostImage
          src={
            post.Images?.length > 0 ? `http://localhost:8080/uploads/${post.Images[0].src}` : '/public/placeholder.png'
          }
        />
      </ImageZone>
      <InfoZone>
        <h2>{post.title}</h2>
        <p>문래동 · {post.created_at}</p>
      </InfoZone>
      <AuthorZone>
        <ProfileImage profile={post.User} style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
        {post.User && (
          <div className="hidden" onClick={stopPropagation}>
            <ProfilePreviewBubble profile={post.User} />
          </div>
        )}
      </AuthorZone>
    </Base>
  );
};

export default memo(PostCard);

import React, { FC, memo, useCallback } from 'react';
import styled from '@emotion/styled';
import { IMe, IPost } from '@typings/db';
import PostImage from '@components/revised/common/images/PostImage';
import ProfileImage from '@components/revised/common/images/ProfileAvatar';
import { useNavigate } from 'react-router-dom';
import ProfilePreviewBubble from '../ProfilePreviewBubble';
import TotalCount from '@components/revised/Home/TotalCount';
import PillBox from '@components/revised/PillBox';

interface IProps {
  post: IPost;
  isMine: boolean;
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
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InfoZone = styled.div`
  margin-left: 10px;
  padding: 5px 0;

  > h2 {
    font-size: 16px;
    line-height: 18px;
    display: flex;
    align-items: flex-end;
  }

  > p {
    margin-top: 5px;
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
const PostCard: FC<IProps> = ({ post, isMine }) => {
  const navigate = useNavigate();

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <Base onClick={() => navigate(`/posts/${post.id}`)}>
      <ImageZone>
        {post.Images?.length > 0 && <TotalCount current={1} total={post.Images?.length} />}
        <PostImage
          src={post.Images?.length > 0 ? post.Images[0].src : undefined}
          alt={post?.Images[0]?.id}
          style={{ border: '1px solid #dfdfdf' }}
        />
      </ImageZone>
      <InfoZone>
        <h2>
          {post.title}
          {isMine && (
            <PillBox text={'나의 비밀글'} style={{ fontSize: '10px', padding: '2px 6px 0', marginLeft: '5px' }} />
          )}
        </h2>
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

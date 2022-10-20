import React, { FC, memo } from 'react';
import styled from '@emotion/styled';
import { IPost } from '@typings/db';
import PostImage from '@components/revised/common/images/PostImage';
import { useNavigate } from 'react-router-dom';
import TotalCount from '@components/revised/Home/TotalCount';

interface IProps {
  post?: IPost;
}

export const Base = styled.li`
  position: relative;
  border-bottom: 1px solid #dfdfdf;
  padding: 10px 0;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
`;

export const ImageZone = styled.div`
  position: relative;
  width: 100px;
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
  padding: 3px 6px 1px;
  border-radius: 12px;
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
    top: 0;
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
  const handleNavigate = (path: string) => () => navigate(path);
  return (
    <Base onClick={handleNavigate(`/posts/${post?.id}`)}>
      <ImageZone>
        <TotalCount current={1} total={1} />
        {/*<PostImage src={post?.Images?.length > 0 ? post?.Images[0].src : undefined} alt={post?.Images[0].id} />*/}
      </ImageZone>
      <InfoZone>
        <h2>{post?.title}</h2>
        <p>문래동 · {post?.created_at}</p>
      </InfoZone>
    </Base>
  );
};

export default memo(PostCard);

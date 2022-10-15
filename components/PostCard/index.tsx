import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { IPost } from '@typings/db';
import CountPill from './CountPill';
import ProfileImageButton from '@components/common/profiles-related/ProfileImageButton';
import { AiOutlineEye } from 'react-icons/ai';
import { MdPeopleOutline } from 'react-icons/md';
import { IPostCard } from '../../typings/db';

interface IProps {
  post: IPostCard;
}

export const Base = styled.ul`
  width: 100%;
  padding: 0 10px;
`;

export const Container = styled.div`
  position: relative;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  > a {
    display: flex;
    width: 100%;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  overflow: hidden;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  padding: 6px 0;
  & h2 {
    font-size: 18px;
    font-weight: 600;
  }

  & span {
    font-size: 13px;
    color: #65676b;
  }
`;

export const UserProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const PostCard: FC<IProps> = ({ post }) => {
  return (
    <Base>
      <Container>
        <Link to={`/posts/${post.id}`}>
          <ImageWrapper>
            <img src={`http://localhost:8080/uploads/${post?.Images?.src}` || '/public/1.png'} alt={'images'} />
            <CountPill length={3} />
          </ImageWrapper>
          <TextWrapper>
            <h2>{post.title}</h2>
            <p>
              <span>문래역 · </span>
              <span>{post.created_at}</span>
            </p>
          </TextWrapper>
          <UserProfileWrapper>
            <ProfileImageButton
              src={post.User.profile_image_url || '/public/placeholder.png'}
              nickname={post.User.nickname}
              style={{ width: '30px', height: '30px' }}
            />
          </UserProfileWrapper>
        </Link>
      </Container>
    </Base>
  );
};

export default PostCard;

import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import TopNavigation from '@components/PostsAndProfile/TopNavigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useTheme } from '@emotion/react';
import PillButton from '@components/common/buttons/PillButton';
import { BsChat } from 'react-icons/bs';
import { HiOutlineLocationMarker, HiHeart, HiOutlineHeart } from 'react-icons/hi';
import Section from '@components/PostsAndProfile/Section';
import ActionButtonList from '@components/PostsAndProfile/ProfileBox/ActionButtonList';
import ActionButton from '@components/PostsAndProfile/ProfileBox/ActionButtonList/ActionButton';
import ProfileBox from '@components/PostsAndProfile/ProfileBox';

export const Base = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
`;

export const MainContentZone = styled.div`
  padding-top: 73px;
  width: 440px;
  top: 73px;
  bottom: 0;
`;

export const Images = styled.div`
  width: 100%;
  height: 200px;
  border-bottom: 1px solid #dfdfdf;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 0;

  & .nickname {
    font-size: 15px;
    font-weight: 700;
    margin-right: 10px;
  }
`;

export const ProfileImageButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #dfdfdf;
  overflow: hidden;
  background-color: #fff;
  cursor: pointer;
  margin-right: 10px;

  & img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

export const TextZone = styled.div<{ theme: any }>`
  width: 100%;
  padding: 20px;

  & .title {
    font-size: 22px;
  }

  & .mypings {
    font-size: 14px;
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.gray[600]};

    > span:first-of-type {
      text-decoration: underline;
    }
  }

  & .content {
    font-size: 16px;
    margin: 20px 0;
    max-height: 400px;
  }

  & .meta {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray[600]};
  }
`;

interface IForm {
  searchQueries: string;
}

const Post = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { postId } = useParams<{ postId: string }>();
  const { data: pd, mutate: mutatePostData } = useSWR(`/posts/${postId}`, fetcher);

  console.log('>>>', pd);

  if (pd?.post?.is_private) navigate('/');

  return (
    <Base>
      <TopNavigation onClick={() => navigate('/')} />
      <MainContentZone>
        {/*{pd?.post.files && (*/}
        <Images>
          <img src={'/public/logo.png'} />
        </Images>
        {/*)}*/}
        <ProfileBox>
          <ProfileCard>
            <ProfileImageButton onClick={() => navigate(`/${pd?.post.nickname}`)}>
              <img src={pd?.post?.profile_image_url || '/public/placeholder.png'} />
            </ProfileImageButton>
            <span className={'nickname'}>{pd?.post?.nickname || '사용자 닉네임'}</span>
            <PillButton content={'채팅'} onClick={() => navigate(`/chatrooms`)} />
          </ProfileCard>
          <ActionButtonList>
            <ActionButton content={'좋아요'} onClick={() => console.log('clicked')} />
            <ActionButton content={'위치'} onClick={() => console.log('clicked')} />
            <ActionButton content={`댓글(0)`} onClick={() => console.log('clicked')} />
          </ActionButtonList>
        </ProfileBox>
        <TextZone theme={theme}>
          <h3 className={'title'}>{pd?.post.title}</h3>
          <div className={'mypings'}>
            <span>
              <Link to={`/users/${pd?.post.nickname}`}>마이핑스</Link>
            </span>
            <span> · {pd?.post.created_at}</span>
          </div>
          <p className={'content'}>{pd?.post.content}</p>
          <p className={'meta'}>
            관심 {pd?.likers.length} · 공유 {0} · 조회 {pd?.post.hits}
          </p>
        </TextZone>
        {/* 마이핑스 영역 */}
        <Section title={`${pd?.post.nickname}의 마이핑스`}>....</Section>
      </MainContentZone>
    </Base>
  );
};

export default Post;

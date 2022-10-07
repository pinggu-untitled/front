import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import DetailTopNavigation from '@components/common/navigations/DetailTopNavigation';
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useTheme } from '@emotion/react';
import PillButton from '@components/common/buttons/PillButton';
import Section from '@components/common/sections/Section';
import ActionButtonList from '@components/common/profiles-related/ProfileBox/ActionButtonList';
import ActionButton from '@components/common/profiles-related/ProfileBox/ActionButtonList/ActionButton';
import ProfileBox from '@components/common/profiles-related/ProfileBox';
import ProfileImageButton from '@components/common/profiles-related/ProfileImageButton';
import FollowButton from '@components/common/profiles-related/ProfileBox/FollowButton';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { HiLocationMarker, HiOutlineLocationMarker, HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { BiCommentDetail } from 'react-icons/bi';
import HoverLabel from '@components/common/labels/HoverLabel';
import ImagesZoomModal from '@components/common/image-related/ImagesZoomModal';

export const Base = styled.div`
  width: 100%;
  height: 100vh;
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

export const ProfileBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  > div {
    display: flex;
    align-items: center;
  }
  & .nickname {
    font-size: 15px;
    font-weight: 700;
    margin: 0 10px;
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

export const ContentWrapper = styled.div`
  & svg {
    font-size: 24px;
  }

  > .counts {
    font-size: 14px;
    display: inline-block;
    margin-left: 5px;
    transform: translateY(-5px);
    font-weight: 600;
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
  const [following, setFollowing] = useState(false);
  const [showModals, setShowModals] = useState<{ [key: string]: boolean }>({ showImagesZoomModal: false });
  const handleModal = useCallback((modalName: string) => {
    setShowModals((p) => ({ ...p, [modalName]: !p[modalName] }));
  }, []);

  console.log('>>>', pd);

  if (pd?.post?.is_private) return <Navigate replace to="/" />;

  return (
    <Base>
      <DetailTopNavigation onClick={() => navigate('/')} />
      <MainContentZone>
        <Images onClick={() => handleModal('showImagesZoomModal')}>
          <img src={'/public/logo.png'} alt={'profile'} />
        </Images>
        <ImagesZoomModal
          show={showModals.showImagesZoomModal}
          onCloseModal={() => handleModal('showImagesZoomModal')}
          images={[{ src: '/public/logo.png' }, { src: '/public/1.png' }]}
        />
        <ProfileBox>
          <ProfileBar>
            <div>
              <ProfileImageButton
                src={pd?.post?.profile_image_url || '/public/placeholder.png'}
                nickname={pd?.post?.nickname}
              />
              <span className={'nickname'}>{pd?.post?.User.nickname || '사용자 닉네임'}</span>
              <PillButton content={'채팅'} onClick={() => navigate(`/chatrooms`)} />
            </div>
            <FollowButton isClicked={following} onClick={() => setFollowing((p) => !p)} />
          </ProfileBar>
          <ActionButtonList>
            <ActionButton
              content={
                <HoverLabel label={'좋아요'} style={{ top: '28px' }}>
                  <ContentWrapper>
                    <AiOutlineLike />
                    <span className={'counts'}>{pd?.likers?.length}</span>
                  </ContentWrapper>
                </HoverLabel>
              }
              onClick={() => console.log('clicked')}
            />
            <ActionButton
              content={
                <HoverLabel label={'위치 찾기'} style={{ top: '28px' }}>
                  <HiOutlineLocationMarker />
                </HoverLabel>
              }
              onClick={() => console.log('clicked')}
            />
            <ActionButton
              content={
                <HoverLabel label={'댓글'} style={{ top: '28px' }}>
                  <ContentWrapper>
                    <BiCommentDetail />
                    <span className={'counts'}>{pd?.comments?.length || 10}</span>
                  </ContentWrapper>
                </HoverLabel>
              }
              onClick={() => console.log('clicked')}
            />
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
          <p className={'meta'}>조회수 {pd?.post.hits}</p>
        </TextZone>
        {/* 마이핑스 영역 */}
        <Section title={`${pd?.post.nickname}의 마이핑스`}>....</Section>
      </MainContentZone>
    </Base>
  );
};

export default Post;

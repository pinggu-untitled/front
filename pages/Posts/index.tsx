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

export const ImagesWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-bottom: 1px solid #dfdfdf;
  display: grid;
  /* grid-template-columns: repeat(2, 1fr); */
  position: relative;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const More = styled.div`
  position: relative;
  height: 200px;

  > .button {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    z-index: 3000;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: #fff;
    opacity: 0;
    transition: 0.2s;
  }

  &:hover .button {
    opacity: 1;
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

export const ImageLeftCnt = styled.div`
  padding: 4px 10px 3px;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  position: absolute;
  color: rgba(0, 0, 0, 0.8);
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  font-weight: 500;
  > .highlight {
    color: #fff;
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
        {pd?.post.Images.length > 0 && (
          <>
            <ImagesWrapper
              onClick={() => handleModal('showImagesZoomModal')}
              style={pd?.post.Images.length === 1 ? { height: '300px' } : { gridTemplateColumns: 'repeat(2, 1fr)' }}
            >
              {pd?.post?.Images.length === 1 && (
                <img src={`http://localhost:8080/uploads/${pd?.post?.Images[0].src}`} alt={'img'} />
              )}

              {pd?.post?.Images.length === 2 &&
                pd?.post?.Images.slice(0, 2).map((data: { src: string }) => (
                  <img src={`http://localhost:8080/uploads/${data.src}`} alt={'img'} />
                ))}

              {pd?.post?.Images.length >= 3 &&
                pd?.post?.Images.slice(0, 2).map((data: { src: string }, i: number) => {
                  if (i === 0) {
                    return <img src={`http://localhost:8080/uploads/${data.src}`} alt={'img'} />;
                  }

                  return (
                    <More>
                      <img src={`http://localhost:8080/uploads/${data.src}`} alt={'img'} />
                      <div className="button">{pd?.post?.Images.length - 2}개 더보기</div>
                    </More>
                  );
                })}
              {pd?.post?.Images.length >= 3 && (
                <ImageLeftCnt>
                  <span className="highlight">2</span>
                  <span>/{pd?.post?.Images.length}</span>
                </ImageLeftCnt>
              )}
            </ImagesWrapper>
            <ImagesZoomModal
              show={showModals.showImagesZoomModal}
              onCloseModal={() => handleModal('showImagesZoomModal')}
              images={pd?.post.Images}
            />
          </>
        )}
        <ProfileBox>
          <ProfileBar>
            <div>
              <ProfileImageButton
                src={pd?.post?.User.profile_image_url || '/public/placeholder.png'}
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

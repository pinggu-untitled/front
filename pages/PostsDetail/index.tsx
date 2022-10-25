import React, { useCallback, useMemo, useRef } from 'react';
import styled from '@emotion/styled';
import DetailTopNavigation from '@components/revised/common/navigations/DetailTopNavigation';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useTheme } from '@emotion/react';
import ImagesZoomModal from '@components/common/image-related/ImagesZoomModal';
import PreviewCard from '@components/revised/PostsDetail/PreviewSection/PreviewCard';
import PreviewSection from '../../components/revised/PostsDetail/PreviewSection/index';
import { Base, MainContentZone } from '@pages/Home';
import SettingsModal from '@components/revised/SettingsModal';
import useModals from '@utils/useModals';
import { BiCommentDetail, BiEditAlt } from 'react-icons/bi';
import { AiOutlineDelete, AiOutlineLike, AiOutlineLink } from 'react-icons/ai';
import { IImage, IMe, IMyPings, IPost } from '@typings/db';
import PostImage from '@components/revised/common/images/PostImage';
import { v4 as uuid } from 'uuid';
import TotalCount from '@components/revised/Home/TotalCount';
import displayEven from '@utils/displayEven';
import ProfileSummaryBar from '@components/revised/PostsDetail/ProfileSummaryBar';
import TapItem from '@components/revised/Profile/TapList/TapItem';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import TapList from '@components/revised/Profile/TapList';
import HoverLabel from '@components/common/labels/HoverLabel';
import { useMap } from '@contexts/MapContext';
import compose from '@utils/compose';
import readable from '@utils/readable';
import handleNavigate from '@utils/handleNavigate';
import axios from 'axios';
import CommentForm from '@components/revised/PostsDetail/CommentForm';
import regexifyString from 'regexify-string';

export const ImagesContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-bottom: 1px solid #dfdfdf;
  display: grid;
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
    overflow: scroll;
  }

  & .meta {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray[600]};
  }
`;

const PostDetail = () => {
  const theme = useTheme();
  const navigator = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const { data: md } = useSWR<IMe>('/users/me', fetcher);
  const { data: pd } = useSWR<IPost>(`/posts/${postId}`, fetcher);
  const { data: mypings } = useSWR<IMyPings[]>(`/users/${pd?.User.id}/mypings`, fetcher);
  const { data: userPd } = useSWR<IPost[]>(`/users/${pd?.User.id}/posts`, fetcher);
  const copyUrlRef = useRef<HTMLTextAreaElement | null>(null);
  const [showModals, handleModal] = useModals('showSettingsModal', 'showEachTapSettingsModal', 'showImagesZoomModal');
  const { moveCenterToPost, getMapInfo } = useMap();

  // console.log('🌷', pd);

  if (pd && moveCenterToPost) {
    moveCenterToPost(Number(pd.latitude), Number(pd.longitude));
    getMapInfo();
  }

  const copyUrl = (e: any) => {
    copyUrlRef.current?.select();
    document.execCommand('copy');
    e.target.focus();
  };

  const onDelete = (postId?: string) => () => {
    axios
      .delete(`/posts/${postId}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  const userSettingItems = [
    {
      content: { icon: <BiEditAlt />, title: '편집하기' },
      onClick: handleNavigate(navigator, `/posts/${postId}/edit`),
    },
    { content: { icon: <AiOutlineDelete />, title: '삭제하기' }, onClick: onDelete(postId) },
  ];
  const viewerSettingItems = [
    {
      content: {
        icon: <AiOutlineLink />,
        title: '링크 복사',
        rest: (
          <form>
            <textarea ref={copyUrlRef} value={window.location.href} />
          </form>
        ),
      },
      onClick: copyUrl,
    },
  ];
  const postImageStyle = { width: '100%', height: '100%', borderRadius: 0, border: 'none' };

  const exceptCurrentPost = (posts: IPost[]) => posts.filter((item) => item.id !== Number(postId));

  const refineContent = useCallback<(content: string) => (string | JSX.Element)[] | JSX.Element>(
    (content: string) => {
      const result = regexifyString({
        pattern: /#[^\s#]+|@[^\s@]+|http[^\shttp]+|https:[^\shttps]+|\n/g,
        decorator(match, index) {
          const social: string[] | null = match.match(/http[^\shttp]+|https[^\shttps]+/g);

          if (social) {
            return (
              <a key={uuid()} href={social[0]} style={{ color: '#1974e4', textDecoration: 'underline' }}>
                {social[0]}
              </a>
            );
          }

          const arr: string[] | null = match.match(/#[^\s#]+|@[^\s@]+/g);
          console.log(arr);
          if (arr) {
            return (
              <Link key={uuid()} to={`/results?search_query=${arr[0].slice(1)}`} style={{ color: '#1974e4' }}>
                {arr[0]}
              </Link>
            );
          }
          return <br key={uuid()} />;
        },
        input: content,
      });

      return result;
    },
    [pd?.content],
  );

  if (pd === undefined) return <div>로딩중...</div>;

  return (
    <Base>
      <DetailTopNavigation prev={'/'} toggleOptions={handleModal('showSettingsModal')} />
      <SettingsModal
        show={showModals.showSettingsModal}
        onCloseModal={handleModal('showSettingsModal')}
        items={md?.id === pd?.User.id ? userSettingItems : viewerSettingItems}
        style={{ top: '60px', left: '310px' }}
      />
      <ImagesZoomModal
        show={showModals.showImagesZoomModal}
        onCloseModal={handleModal('showImagesZoomModal')}
        images={pd?.Images}
      />
      <MainContentZone style={{ overflow: 'scroll' }}>
        {pd?.Images && pd?.Images.length > 0 && (
          <ImagesContainer
            onClick={handleModal('showImagesZoomModal')}
            style={
              pd?.Images?.length === 1
                ? { display: 'flex', justifyContent: 'center', backgroundColor: '#191919' }
                : pd?.Images?.length >= 2
                ? { gridTemplateColumns: 'repeat(2, 1fr)' }
                : {}
            }
          >
            {pd?.Images.length === 1 && (
              <PostImage
                src={pd?.Images[0].src}
                alt={pd?.Images[0].id}
                style={{ width: '200px', height: '200px', borderRadius: 0, border: 'none' }}
              />
            )}
            {pd?.Images.length === 2 &&
              pd?.Images.slice(0, 2).map((data: IImage) => (
                <PostImage key={uuid()} src={data.src} alt={data.id} style={postImageStyle} />
              ))}
            {pd?.Images.length >= 3 && (
              <>
                <TotalCount current={2} total={pd?.Images?.length} />
                {pd?.Images.slice(0, 2).map((data: IImage, i: number) => {
                  return i === 0 ? (
                    <PostImage key={uuid()} src={data.src} alt={data.id} style={postImageStyle} />
                  ) : (
                    <More>
                      <PostImage key={uuid()} src={data.src} alt={data.id} style={postImageStyle} />
                      <div className="button">{pd?.Images.length - 2}개 더보기</div>
                    </More>
                  );
                })}
              </>
            )}
          </ImagesContainer>
        )}
        {pd?.User && <ProfileSummaryBar profile={pd?.User} />}
        <TapList count={3}>
          <HoverLabel label={'좋아요'} style={{ top: '34px' }}>
            <TapItem icon={<AiOutlineLike />} onClick={() => {}} match={'/:userId'} />
          </HoverLabel>
          <HoverLabel label={'위치'} style={{ top: '34px' }}>
            <TapItem icon={<HiOutlineLocationMarker />} onClick={() => {}} match={'/:userId/mypings'} />
          </HoverLabel>
          <HoverLabel label={'댓글'} style={{ top: '34px' }}>
            <TapItem icon={<BiCommentDetail />} onClick={() => {}} match={'/:userId/friends'} />
          </HoverLabel>
        </TapList>
        <TextZone theme={theme}>
          <h3 className={'title'}>{pd?.title}</h3>
          <div className={'mypings'}>
            <span>{pd?.created_at}</span>
          </div>
          <p className={'content'}>{refineContent(pd?.content)}</p>
          <p className={'meta'}>조회수 {pd?.hits}</p>
        </TextZone>
        <CommentForm />
        <PreviewSection title={`${pd?.User.nickname}의 게시물`} url={`/${pd?.User.id}`}>
          {md &&
            userPd &&
            compose(
              readable(md),
              exceptCurrentPost,
              displayEven,
            )(userPd)
              .slice(0, 6)
              ?.map((post, i) => <PreviewCard key={i} post={post} />)}
        </PreviewSection>
      </MainContentZone>
    </Base>
  );
};

export default PostDetail;

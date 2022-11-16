import { useNavigate, useParams } from 'react-router-dom';
import PagePrevHeader from '@components/headers/PagePrevHeader';
import { PageMain } from '@pages/Home/style';
import { IMenuItem } from '@components/Layout/MenuList/MenuItem';
import { BiEditAlt } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import { useSession } from '@contexts/SessionContext';
import ImagesZoomModal from '@components/PostDetail/ImageZoomModal';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { ImagesContainer, More, PostImage, TextZone } from '@components/PostDetail/style';
import mediaPath from '@utils/mediaPath';
import { IImage, IPost } from '@typings/db';
import { TotalCount } from '@components/Home/PostCard/style';
import regexifyContent from '@utils/regexifyContent';
import CommentPool from '@components/PostDetail/CommentPool';
import readable from '@utils/readable';
import PreviewSection from '@components/PostDetail/PreviewSection';
import PreviewCard from '@components/PostDetail/PreviewSection/PreviewCard';
import { useMap } from '@contexts/MapContext';
import timeForToday from '@utils/timeForToday';
import AuthorCard from '@components/PostDetail/AuthorCard';

const PostDetail = () => {
  const navigate = useNavigate();
  const { moveCenterToPost } = useMap();
  const { postId } = useParams<{ postId: string }>();
  const { data: Post } = useSWR(`/posts/${postId}`, fetcher);
  const { data: Posts } = useSWR(`/users/${Post?.User.id}/posts`, fetcher);
  const { session } = useSession();
  const [showModals, setShowModals] = useState<{ [key: string]: boolean }>({
    showImagesZoomModal: false,
  });
  const handleModal = (modalName: string) => () => {
    setShowModals((p) => ({ ...p, [modalName]: !p[modalName] }));
  };
  const items: IMenuItem[] = [
    {
      icon: <BiEditAlt />,
      title: '게시물 수정하기',
      onClick: () => navigate(`/posts/${postId}/edit`),
    },
    {
      icon: <MdDeleteOutline />,
      title: '게시물 삭제하기',
      onClick: () => navigate('/mypings/new'),
    },
  ];

  const postImageStyle = {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    border: 'none',
  };

  const exceptCurrentPost = (posts: IPost[]) => posts.filter((item) => item.id !== Number(postId));

  const compose =
    (...fns: Function[]) =>
    (arg: any): any[] =>
      fns.reduce((composed, fn) => fn(composed), arg);

  const displayEven = (data: any[]): any[] => {
    const len = data.length;
    return len % 2 === 0 ? data : data.slice(0, len - 1);
  };

  useEffect(() => {
    if (Post) {
      moveCenterToPost(Number(Post.latitude), Number(Post.longitude));
    }
  }, [Post]);

  if (!Post) return <div>로딩중..</div>;

  return (
    <>
      <PagePrevHeader menuItems={session.id === Post?.User.id ? items : undefined} />
      <PageMain>
        <ImagesZoomModal
          show={showModals.showImagesZoomModal}
          onCloseModal={handleModal('showImagesZoomModal')}
          images={Post?.Images}
        />
        {Post?.Images && Post?.Images.length > 0 && (
          <ImagesContainer
            onClick={handleModal('showImagesZoomModal')}
            style={
              Post?.Images?.length === 1
                ? {
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#191919',
                  }
                : Post?.Images?.length >= 2
                ? { gridTemplateColumns: 'repeat(2, 1fr)' }
                : {}
            }
          >
            {Post?.Images.length === 1 && (
              <PostImage
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: 0,
                  border: 'none',
                }}
              >
                <img src={mediaPath('post', Post?.Images[0].src)} alt={Post?.Images[0].id} />
              </PostImage>
            )}
            {Post?.Images.length === 2 &&
              Post?.Images.slice(0, 2).map((data: IImage) => (
                <PostImage key={data.id} style={{ width: '100%', height: '100%', borderRadius: 0 }}>
                  <img src={mediaPath('post', data.src)} alt={`${data.id}`} />
                </PostImage>
              ))}
            {Post?.Images.length >= 3 && (
              <>
                <TotalCount>
                  <span className={'current'}>2</span> / {Post?.Images?.length}
                </TotalCount>
                {Post?.Images.slice(0, 2).map((data: IImage, i: number) => {
                  return i === 0 ? (
                    <PostImage key={data.id} style={postImageStyle}>
                      <img src={mediaPath('post', data.src)} alt={`${data.id}`} />
                    </PostImage>
                  ) : (
                    <More>
                      <PostImage key={data.id} style={postImageStyle}>
                        <img src={mediaPath('post', data.src)} alt={`${data.id}`} />
                      </PostImage>
                    </More>
                  );
                })}
              </>
            )}
          </ImagesContainer>
        )}
        <AuthorCard data={Post} />
        <TextZone>
          <h3 className={'title'}>{Post?.title}</h3>
          <div className={'created-at'}>
            <span>{timeForToday(Date.parse(Post?.created_at))}</span>
          </div>
          <p className={'content'}>{regexifyContent(Post?.content)}</p>
          <p className={'meta'}>조회수 {Post?.hits}</p>
        </TextZone>
        <CommentPool />
        {Posts && (
          <PreviewSection title={`${Post?.User.nickname}의 게시물`} url={`/${Post?.User.id}`}>
            {session &&
              Posts &&
              compose(
                (posts: IPost[]) => readable(session, posts),
                exceptCurrentPost,
                displayEven,
              )(Posts)
                .slice(0, 6)
                ?.map((post, i) => <PreviewCard key={i} post={post} />)}
          </PreviewSection>
        )}
      </PageMain>
    </>
  );
};
export default PostDetail;

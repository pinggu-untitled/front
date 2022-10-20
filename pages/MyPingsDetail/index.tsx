import React, { useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import DetailTopNavigation from '@components/revised/common/navigations/DetailTopNavigation';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useTheme } from '@emotion/react';
import { Base, MainContentZone } from '@pages/Home';
import useModals from '@utils/useModals';
import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineDelete, AiOutlineLink } from 'react-icons/ai';
import { IImage, IMe, IUser } from '@typings/db';

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
  }

  & .meta {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray[600]};
  }
`;

interface IForm {
  searchQueries: string;
}

const MyPingsDetail = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { userId, mypingsId } = useParams<{ userId: string; mypingsId: string }>();
  const { data: md, mutate: mutateMd } = useSWR<IMe>('/users/me', fetcher);
  const { data: mypings, mutate: mutateMypings } = useSWR(`users/${userId}/mypings/${mypingsId}`, fetcher);
  const { data: pd, mutate: mutatePd } = useSWR(`users/${userId}/mypings/${mypingsId}/posts`, fetcher);
  console.log(pd);
  const copyUrlRef = useRef<HTMLTextAreaElement | null>(null);
  const [showModals, handleModal] = useModals('showSettingsModal');

  const copyUrl = useCallback((e: any) => {
    copyUrlRef.current?.select();
    document.execCommand('copy');
    e.target.focus();
  }, []);

  const displayEven = (data: any[]): any[] => {
    const len = data.length;
    return len % 2 === 0 ? data : data.slice(0, len - 1);
  };

  const userSettingItems = [
    { content: { icon: <BiEditAlt />, title: '편집하기' }, onClick: () => console.log('good') },
    { content: { icon: <AiOutlineDelete />, title: '삭제하기' }, onClick: () => console.log('good') },
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

  const postImageStyle = { width: '100%', height: '100%' };

  return (
    <Base>
      <DetailTopNavigation prev={`/${userId}/mypings`} toggleOptions={handleModal('showSettingsModal')} />
      {/*<SettingsModal*/}
      {/*  show={showModals.showSettingsModal}*/}
      {/*  onCloseModal={handleModal('showSettingsModal')}*/}
      {/*  items={md?.id === mypings?.post.user.id ? userSettingItems : viewerSettingItems}*/}
      {/*  style={{ top: '60px', left: '310px' }}*/}
      {/*/>*/}
      <MainContentZone>
        {/*  {mypings?.post?.Images?.length >= 1 && (*/}
        {/*    <ImagesContainer*/}
        {/*      onClick={handleModal('showImagesZoomModal')}*/}
        {/*      style={mypings?.post.Images.length >= 1 ? { gridTemplateColumns: 'repeat(2, 1fr)' } : {}}*/}
        {/*    >*/}
        {/*      {mypings?.post?.Images.length === 1 && (*/}
        {/*        <PostImage*/}
        {/*          src={mypings?.post?.Images[0].src}*/}
        {/*          alt={mypings?.post?.Images[0].id}*/}
        {/*          style={{ width: '200px', height: '200px' }}*/}
        {/*        />*/}
        {/*      )}*/}
        {/*      {mypings?.post?.Images.length === 2 &&*/}
        {/*        mypings?.post?.Images.slice(0, 2).map((data: IImage) => (*/}
        {/*          <PostImage key={uuid()} src={data.src} alt={data.id} style={postImageStyle} />*/}
        {/*        ))}*/}
        {/*      {mypings?.post?.Images.length >= 3 && (*/}
        {/*        <>*/}
        {/*          <TotalCount current={2} total={mypings?.post?.Images?.length} />*/}
        {/*          {mypings?.post?.Images.slice(0, 2).map((data: IImage, i: number) => {*/}
        {/*            return i === 0 ? (*/}
        {/*              <PostImage key={uuid()} src={data.src} alt={data.id} style={postImageStyle} />*/}
        {/*            ) : (*/}
        {/*              <More>*/}
        {/*                <PostImage key={uuid()} src={data.src} alt={data.id} style={postImageStyle} />*/}
        {/*                <div className="button">{mypings?.post?.Images.length - 2}개 더보기</div>*/}
        {/*              </More>*/}
        {/*            );*/}
        {/*          })}*/}
        {/*        </>*/}
        {/*      )}*/}
        {/*    </ImagesContainer>*/}
        {/*  )}*/}
        {/*  /!* <ProfileBox>*/}
        {/*      <ProfileBar>*/}
        {/*        <div>*/}
        {/*          <ProfileImageButton*/}
        {/*            src={mypings?.post?.user.profile_image_url || '/public/placeholder.png'}*/}
        {/*            nickname={mypings?.post?.nickname}*/}
        {/*          />*/}
        {/*          <span className={'nickname'}>{mypings?.post?.user.nickname || '사용자 닉네임'}</span>*/}
        {/*          <PillButton content={'채팅'} onClick={() => navigate(`/chatrooms`)} />*/}
        {/*        </div>*/}
        {/*        <FollowButton isClicked={following} onClick={() => setFollowing((p) => !p)} />*/}
        {/*      </ProfileBar>*/}
        {/*      <ProfileActionButtons>*/}
        {/*        <ActionButton*/}
        {/*          content={*/}
        {/*            <HoverLabel label={'좋아요'} style={{ top: '28px' }}>*/}
        {/*              <ContentWrapper>*/}
        {/*                <AiOutlineLike />*/}
        {/*                <span className={'counts'}>{mypings?.likers?.length}</span>*/}
        {/*              </ContentWrapper>*/}
        {/*            </HoverLabel>*/}
        {/*          }*/}
        {/*          onClick={() => console.log('clicked')}*/}
        {/*        />*/}
        {/*        <ActionButton*/}
        {/*          content={*/}
        {/*            <HoverLabel label={'위치 찾기'} style={{ top: '28px' }}>*/}
        {/*              <HiOutlineLocationMarker />*/}
        {/*            </HoverLabel>*/}
        {/*          }*/}
        {/*          onClick={() => console.log('clicked')}*/}
        {/*        />*/}
        {/*        <ActionButton*/}
        {/*          content={*/}
        {/*            <HoverLabel label={'댓글'} style={{ top: '28px' }}>*/}
        {/*              <ContentWrapper>*/}
        {/*                <BiCommentDetail />*/}
        {/*                <span className={'counts'}>{mypings?.comments?.length || 10}</span>*/}
        {/*              </ContentWrapper>*/}
        {/*            </HoverLabel>*/}
        {/*          }*/}
        {/*          onClick={() => console.log('clicked')}*/}
        {/*        />*/}
        {/*      </ProfileActionButtons>*/}
        {/*    </ProfileBox> *!/*/}
        {/*  <TextZone theme={theme}>*/}
        {/*    <h3 className={'title'}>{mypings?.post.title}</h3>*/}
        {/*    <div className={'mypings'}>*/}
        {/*      <span>*/}
        {/*        <Link to={`/mypings/${mypings?.post.id}`}>마이핑스</Link>*/}
        {/*      </span>*/}
        {/*      <span> · {mypings?.post.created_at}</span>*/}
        {/*    </div>*/}
        {/*    <p className={'content'}>{mypings?.post.content}</p>*/}
        {/*    <p className={'meta'}>조회수 {mypings?.post.hits}</p>*/}
        {/*  </TextZone>*/}
        {/*  <PreviewSection title={`${mypings?.post.user.nickname}의 마이핑스`} url={`/${mypings?.post.user.id}/myPings`}>*/}
        {/*    {displayEven([1, 2, 3]).map((data, i) => (*/}
        {/*      <PreviewCard key={i} data={data} />*/}
        {/*    ))}*/}
        {/*  </PreviewSection>*/}
        {/*  <PreviewSection title={`${mypings?.post.user.nickname}의 게시물`} url={`/${mypings?.post.user.id}/posts`}>*/}
        {/*    {displayEven([1, 2, 3]).map((data, i) => (*/}
        {/*      <PreviewCard key={i} data={data} />*/}
        {/*    ))}*/}
        {/*  </PreviewSection>*/}
      </MainContentZone>
    </Base>
  );
};

export default MyPingsDetail;

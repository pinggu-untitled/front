import { FC } from 'react';
import { IPost } from '@typings/db';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import mediaPath from '../../../../utils/mediaPath';
import { NoMedia, TotalCount } from '@components/Home/PostCard/style';
import { HiOutlineCamera } from 'react-icons/hi';

interface IProps {
  post: IPost;
}

export const Base = styled.div`
  flex: 1;
  position: relative;
  > p {
    font-size: 14px;
    font-weight: 600;
    padding: 0 4px;
    margin-top: 4px;
  }
`;
export const ImageWrapper = styled.div`
  height: 120px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  overflow: hidden;
  background-color: #191919;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PreviewCard: FC<IProps> = ({ post }) => {
  const navigate = useNavigate();
  if (!post) return <div>로딩중..</div>;
  return (
    <Base onClick={() => navigate(`/posts/${post.id}`)}>
      <ImageWrapper>
        {!post?.Images.length && (
          <NoMedia>
            <HiOutlineCamera />
          </NoMedia>
        )}
        {post?.Images.length > 3 && (
          <>
            <TotalCount>
              <span className={'current'}>2</span> / {post?.Images.length}
            </TotalCount>
            <img src={mediaPath('post', post?.Images[0].src)} alt={post.User.nickname} />
          </>
        )}
        {post?.Images.length === 1 ||
          (post?.Images.length === 2 && <img src={mediaPath('post', post?.Images[0].src)} alt={post.User.nickname} />)}
      </ImageWrapper>
      <p className="title">{post.title}</p>
    </Base>
  );
};

export default PreviewCard;

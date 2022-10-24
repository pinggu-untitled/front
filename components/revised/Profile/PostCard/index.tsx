import React, { FC, memo } from 'react';
import styled from '@emotion/styled';
import { IMe, IMyPings, IPost } from '@typings/db';
import PostImage from '@components/revised/common/images/PostImage';
import { useNavigate } from 'react-router-dom';
import TotalCount from '@components/revised/Home/TotalCount';
import ModifyActionButtons from '@components/revised/Profile/ModifyActionButtons';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import handleNavigate from '@utils/handleNavigate';
import PillBox from '@components/revised/PillBox';
import { ImageZone, InfoZone } from '@components/revised/Home/PostCard';
import axios from 'axios';
interface IProps {
  post: IPost;
  mutateFn: any;
}

export const Base = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  border-radius: 4px;
  padding: 10px 0;

  > .info {
    display: flex;
    align-items: flex-start;
  }

  > form {
    width: 100%;
  }
`;

const PostCard: FC<IProps> = ({ post, mutateFn }) => {
  const navigate = useNavigate();
  const { data: md, mutate: mutateMd } = useSWR<IMe>(`/users/me`, fetcher);

  const onSubmit = (e: any) => {
    e.preventDefault();
  };
  const onEdit = (id: number) => (e: any) => {
    handleNavigate(navigate, `/posts/${post?.id}/edit`)();
  };

  const onDelete = (id: number) => (e: any) => {
    console.log(id);
    axios
      .delete(`/posts/${post.id}`)
      .then((res) => {
        console.log(res);
        // navigate(`/${md?.id}`);
        mutateFn();
      })
      .catch((err) => console.error(err));
  };

  if (!post) return <div>로딩중...</div>;

  return (
    <Base
      onClick={handleNavigate(navigate, `/posts/${post?.id}`)}
      style={md?.id === post?.User.id ? { paddingBottom: 0, border: 'none' } : {}}
    >
      <div className={'info'}>
        <ImageZone>
          <TotalCount current={1} total={1} />
          <PostImage
            src={post?.Images.length > 0 ? post?.Images[0].src : undefined}
            alt={post?.Images.length > 0 ? post?.Images[0].id : undefined}
          />
        </ImageZone>
        <InfoZone>
          <h2>
            {post.title}
            {post.is_private === 1 && (
              <PillBox text={'🔒 Private'} style={{ fontSize: '11px', padding: '2px 6px 0', marginLeft: '5px' }} />
            )}
          </h2>
          <p>문래동 · {post.created_at}</p>
        </InfoZone>
      </div>
      {post && md?.id === post?.User.id && (
        <form onSubmit={onSubmit}>
          <ModifyActionButtons onEdit={onEdit(post.User.id)} onDelete={onDelete(post.User.id)} />
        </form>
      )}
    </Base>
  );
};

export default memo(PostCard);

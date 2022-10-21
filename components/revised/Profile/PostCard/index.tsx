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
interface IProps {
  post: IPost;
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

const PostCard: FC<IProps> = ({ post }) => {
  const navigate = useNavigate();
  const { data: md, mutate: mutateMd } = useSWR<IMe>(`/users/me`, fetcher);

  console.log(post);
  const onSubmit = (e: any) => {
    e.preventDefault();
  };
  const onEdit = (id: number) => () => {
    console.log(id);
    handleNavigate(navigate, `/posts/${post?.id}/edit`)();
  };

  const onDelete = (id: number) => () => {
    console.log(id);
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
          <PostImage />
        </ImageZone>
        <InfoZone>
          <h2>
            {post.title}
            {post.is_private && (
              <PillBox text={'🔒 Private'} style={{ fontSize: '11px', padding: '2px 6px 0', marginLeft: '5px' }} />
            )}
          </h2>
          <p>문래동 · {post.created_at}</p>
        </InfoZone>
      </div>
      {md?.id === post?.User.id && (
        <form onSubmit={onSubmit}>
          <ModifyActionButtons id={post?.id} onEdit={onEdit} onDelete={onDelete} />
        </form>
      )}
    </Base>
  );
};

export default memo(PostCard);

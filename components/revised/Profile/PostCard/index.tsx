import React, { FC, memo } from 'react';
import styled from '@emotion/styled';
import { IMe, IPost } from '@typings/db';
import PostImage from '@components/revised/common/images/PostImage';
import { useNavigate } from 'react-router-dom';
import TotalCount from '@components/revised/Home/TotalCount';
import ModifyActionButtons from '@components/revised/Profile/ModifyActionButtons';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import handleNavigate from '@utils/handleNavigate';
interface IProps {
  post: IPost;
}

export const Base = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
  //border: 1px solid #dfdfdf;
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

export const ImageZone = styled.div`
  position: relative;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ShowTotals = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 13px;
  color: lightgray;
  padding: 3px 6px 1px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.7);

  > .current {
    color: #fff;
  }
`;

export const InfoZone = styled.div`
  margin-left: 10px;
  padding: 5px 0;

  > h2 {
    font-size: 16px;
  }

  > p {
    font-size: 13px;
    color: gray;
  }
`;

export const AuthorZone = styled.div`
  position: absolute;
  bottom: 10px;
  right: 0;
  display: inline-block;

  > .hidden {
    position: absolute;
    right: 36px;
    top: 0;
    opacity: 0;
    visibility: hidden;
    transition: 0.2s;
  }

  &:hover {
    .hidden {
      opacity: 1;
      visibility: visible;
    }
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
          <h2>{post?.title}</h2>
          <p>문래동 · {post?.created_at}</p>
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

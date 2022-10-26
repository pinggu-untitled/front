import React, { FC, memo, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { IPost } from '@typings/db';
import PostImage from '@components/revised/common/images/PostImage';
import { useNavigate } from 'react-router-dom';
import { BsCheck } from 'react-icons/bs';
import { ImageZone, InfoZone } from '@components/revised/Home/PostCard';
import { Base } from '../PostCard';
import TotalCount from '@components/revised/Home/TotalCount';
import PillBox from '@components/revised/PillBox';

interface IProps {
  post: IPost;
  isChecked: boolean;
  handleCheck: any;
}

export const ActionZone = styled.div`
  height: 100%;
  background-color: red;
`;

export const DeleteAction = styled.label`
  position: absolute;
  top: 10px;
  right: 0;

  > input {
    display: none;
    &:checked + .custom-checkbox {
      border-color: #f7523d;
      background-color: #f7523d;
      color: #fff;
    }
  }

  > .custom-checkbox {
    cursor: pointer;
    z-index: 3000;
    background-color: #fff;
    font-size: 32px;
    width: 30px;
    height: 30px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    color: gray;
    border-radius: 4px;
    transition: 0.2s;

    &:hover {
      border-color: #f7523d;
      color: #f7523d;
    }
  }
`;

export const EditAction = styled.div`
  position: absolute;
  bottom: 10px;
  right: 0;
  font-size: 12px;
  font-weight: 600;
  padding: 0 12px;
  height: 30px;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 4px;
  transition: 0.2s;

  &:hover {
    background-color: #191919;
  }
`;

const SelectPostCard: FC<IProps> = ({ post, isChecked, handleCheck }) => {
  const navigate = useNavigate();
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  return (
    <Base onClick={() => navigate(`/posts/${post.id}`)}>
      <div className={'info'}>
        <ImageZone>
          <TotalCount current={1} total={3} />
          {post.Images?.length > 0 && <TotalCount current={1} total={post.Images?.length} />}
          <PostImage
            src={post.Images?.length > 0 ? post.Images[0].src : '/public/placeholder.png'}
            alt={post.Images[0]?.id}
          />
        </ImageZone>
        <InfoZone>
          <h2>
            {post.title}
            <PillBox text={'🔒 Private'} style={{ fontSize: '11px', padding: '2px 6px 0', marginLeft: '5px' }} />
          </h2>
          <p>문래동 · {post.created_at}</p>
        </InfoZone>
      </div>
      <ActionZone onClick={stopPropagation}>
        <DeleteAction>
          <input type="checkbox" value={post.id} onChange={handleCheck} checked={isChecked} />
          <div className="custom-checkbox">
            <BsCheck />
          </div>
        </DeleteAction>
        <EditAction onClick={() => navigate(`/posts/${post.id}/edit`)}>편집하기</EditAction>
      </ActionZone>
    </Base>
  );
};

export default memo(SelectPostCard);

import React, { FC, memo, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { IPostCard } from '@typings/db';
import PostImage from '@components/revised/common/images/PostImage';
import { TbDotsVertical } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import SettingsModal from '@components/revised/SettingsModal';
import { BiEditAlt } from 'react-icons/bi';
import { BsCheck } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { Controller } from 'react-hook-form';
import { Base, ImageZone, ShowTotals, InfoZone } from '../PostCard';
import { ICheckedPost } from '@pages/ProfilePosts';

interface IProps {
  post: IPostCard;
  isChecked: boolean;
  handleCheck: any;
}

export const ActionZone = styled.div``;

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
    display: inline-block;
    cursor: pointer;
    z-index: 3000;
    background-color: #fff;
    font-size: 32px;
    width: 36px;
    height: 36px;
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
  height: 36px;
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
      <ImageZone>
        <ShowTotals>
          <span className="current">{1}</span>/3
        </ShowTotals>
        <PostImage src={'/public/logo.png'} />
      </ImageZone>
      <InfoZone>
        <h2>{post.title}</h2>
        <p>문래동 · {post.created_at}</p>
      </InfoZone>
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

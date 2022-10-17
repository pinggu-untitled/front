import React, { FC, memo, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { IPostCard } from '@typings/db';
import PostImage from '@components/revised/common/images/PostImage';
import { TbDotsVertical } from 'react-icons/tb';

import { useNavigate } from 'react-router-dom';
import SettingsModal from '@components/revised/SettingsModal';

import { BiEditAlt } from 'react-icons/bi';
import { BsCheckSquare } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { Controller } from 'react-hook-form';
import { Base, ImageZone, ShowTotals, InfoZone } from '../PostCard';
interface IProps {
  post: IPostCard;
  checks: { [key: string | number]: boolean };
  handleCheck: any;
}

export const Label = styled.label`
  > input {
    display: none;
    &:checked + .custom {
      color: green;
    }
  }

  > .custom {
    position: absolute;
    top: 12px;
    left: 2px;
    cursor: pointer;
    z-index: 3000;
    background-color: #fff;
    font-size: 22px;
    width: 22px;
    height: 22px;
    overflow: hidden;
    border: 1px solid gray;
    color: gray;
    border-radius: 4px;
  }
`;

const SelectPostCard: FC<IProps> = ({ post, checks, handleCheck }) => {
  const navigate = useNavigate();
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  return (
    <Base onClick={() => navigate(`/posts/${post.id}`)}>
      <div onClick={stopPropagation}>
        <Label>
          <input type="checkbox" value={post.id} onChange={handleCheck} checked={checks[post.id]} />
          <div className="custom">
            <BsCheckSquare />
          </div>
        </Label>
      </div>
      <ImageZone>
        <ShowTotals>
          <span className="current">{1}</span>/3
        </ShowTotals>
        <PostImage src={post.Images?.src || '/public/logo.png'} />
      </ImageZone>
      <InfoZone>
        <h2>{post.title}</h2>
        <p>문래동 · {post.created_at}</p>
      </InfoZone>
    </Base>
  );
};

export default memo(SelectPostCard);

import React, { FC, memo, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { IMyPings } from '@typings/db';
import PostImage from '@components/revised/common/images/PostImage';
import { useNavigate } from 'react-router-dom';
import { BsCheck } from 'react-icons/bs';
import { Base, ImageZone, ShowTotals, InfoZone } from '../PostCard';

interface IProps {
  mypings: IMyPings;
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

const SelectMyPingsCard: FC<IProps> = ({ mypings, isChecked, handleCheck }) => {
  const navigate = useNavigate();
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  return (
    <Base onClick={() => navigate(`/mypings/${mypings.id}`)}>
      <ImageZone>
        <ShowTotals>
          <span className="current">{1}</span>/3
        </ShowTotals>
        {/*<PostImage src={'/public/logo.png'} />*/}
        {/*<PostImage*/}
        {/*  image={{*/}
        {/*    src:*/}
        {/*      post.Images?.length > 0*/}
        {/*        ? `http://localhost:8080/uploads/${post.Images[0].src}`*/}
        {/*        : '/public/placeholder.png',*/}
        {/*    id: post.Images[0].id,*/}
        {/*  }}*/}
        {/*/>*/}
      </ImageZone>
      <InfoZone>
        <h2>{mypings.title}</h2>
      </InfoZone>
      <ActionZone onClick={stopPropagation}>
        <DeleteAction>
          <input type="checkbox" value={mypings.id} onChange={handleCheck} checked={isChecked} />
          <div className="custom-checkbox">
            <BsCheck />
          </div>
        </DeleteAction>
        <EditAction onClick={() => navigate(`/mypings/${mypings.id}/edit`)}>편집하기</EditAction>
      </ActionZone>
    </Base>
  );
};

export default memo(SelectMyPingsCard);

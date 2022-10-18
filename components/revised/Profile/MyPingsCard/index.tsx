import React, { FC, memo, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { IMyPings, IPostCard } from '@typings/db';
import PostImage from '@components/revised/common/images/PostImage';
import { TbDotsVertical } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import SettingsModal from '@components/revised/SettingsModal';
import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { Base, ShowTotals, InfoZone } from '@components/revised/Profile/PostCard';

interface IProps {
  mypings: IMyPings;
}

export const MyPingsImage = styled.div`
  position: relative;
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 72px;
  border-radius: 4px;
  border: 1px solid #dfdfdf;
  background-color: #eceef0;
  font-weight: 700;
  font-size: 22px;
  color: gray;
`;

const MyPingsCard: FC<IProps> = ({ mypings }) => {
  const navigate = useNavigate();

  return (
    <Base onClick={() => navigate(`/mypings/${mypings.id}`)}>
      <MyPingsImage>
        {mypings.title.slice(0, 1).toUpperCase()}
        <ShowTotals>
          <span className="current">+ {110}</span>
        </ShowTotals>
      </MyPingsImage>
      <InfoZone>
        <h2>{mypings.title}</h2>
      </InfoZone>
    </Base>
  );
};

export default memo(MyPingsCard);

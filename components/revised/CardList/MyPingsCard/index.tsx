import React, { FC, memo, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { IPostCard } from '@typings/db';
import { useNavigate } from 'react-router-dom';
import SettingsModal from '@components/revised/SettingsModal';
import { Base, ShowTotals, ImageZone, InfoZone, AuthorZone } from '@components/revised/Profile/PostCard';
import ProfileImage from '@components/revised/common/images/ProfileImage';
import ProfilePreviewBubble from '../ProfilePreviewBubble';

interface IProps {
  mypings: IPostCard;
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
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);
  return (
    <Base onClick={() => navigate(`/mypings/${mypings.id}`)}>
      <ImageZone>
        <MyPingsImage>
          {mypings.title.slice(0, 1).toUpperCase()}
          <ShowTotals>
            <span className="current">+ {110}</span>
          </ShowTotals>
        </MyPingsImage>
      </ImageZone>
      <InfoZone>
        <h2>{mypings.title}</h2>
      </InfoZone>
      <AuthorZone>
        <ProfileImage profile={mypings.User} style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
        {mypings.User && (
          <div className="hidden" onClick={stopPropagation}>
            <ProfilePreviewBubble profile={mypings.User} />
          </div>
        )}
      </AuthorZone>
    </Base>
  );
};

export default memo(MyPingsCard);

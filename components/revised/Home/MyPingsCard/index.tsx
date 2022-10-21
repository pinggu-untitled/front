import React, { FC, memo, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { IPost } from '@typings/db';
import { useNavigate } from 'react-router-dom';
import SettingsModal from '@components/revised/SettingsModal';
import { Base } from '@components/revised/Profile/PostCard';
import ProfileImage from '@components/revised/common/images/ProfileAvatar';
import ProfilePreviewBubble from '../ProfilePreviewBubble';
import TotalCount from '@components/revised/Home/TotalCount';
import { AuthorZone, ImageZone, InfoZone } from '@components/revised/Home/PostCard';

interface IProps {
  mypings: IPost;
  isMine: boolean;
}

export const MyPingsImage = styled.div`
  position: relative;
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

const MyPingsCard: FC<IProps> = ({ mypingse }) => {
  const navigate = useNavigate();
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);
  return (
    <Base onClick={() => navigate(`/mypings/${mypings.id}`)}>
      <ImageZone>
        <MyPingsImage>
          {mypings.title.slice(0, 1).toUpperCase()}
          <TotalCount current={'+ 100'} />
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

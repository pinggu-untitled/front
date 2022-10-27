import React, { Dispatch, FC, memo, SetStateAction, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { IMe, IMyPings, IPost } from '@typings/db';
import { useNavigate, useParams } from 'react-router-dom';
import { InfoZone } from '@components/revised/Home/PostCard';
import { Base } from '@components/revised/Profile/PostCard';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import TotalCount from '@components/revised/Home/TotalCount';
import ModifyActionButtons from '@components/revised/Profile/ModifyActionButtons';
import handleNavigate from '@utils/handleNavigate';
import PillBox from '@components/revised/PillBox';
import axios from 'axios';
import { MdOutlineBookmarkBorder, MdOutlineBookmark } from 'react-icons/md';
import isIdExisting from '@utils/isIdExisting';
import actionHandler from '@utils/actionHandler';

interface IProps {
  mypings: IMyPings;
}
// #1974e4
// #f7523d;

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

export const ShareButton = styled.div`
  position: absolute;
  top: 10px;
  right: 0;
  font-size: 26px;
  cursor: pointer;
  padding: 0 0 0 12px;
`;

const MyPingsCard: FC<IProps> = ({ mypings }) => {
  const navigator = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { data: md } = useSWR<IMe>(`/users/me`, fetcher);
  const { data: pd } = useSWR<IPost[]>(`/mypings/${mypings?.id}/posts`, fetcher);
  const [isSharing, setSharing] = useState<boolean | null>(false);
  const { data: mySharepings, mutate: mutateMySharepings } = useSWR(`/users/${md?.id}/sharepings`, fetcher);
  const onEdit = (mypingsId: number) => (e: any) => {
    navigator(`/mypings/${mypingsId}/edit`);
  };
  const onDelete = (mypingsId: number) => (e: any) => {
    axios
      .delete(`/mypings/${mypingsId}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (mySharepings) {
      console.log('useEffect', isIdExisting(mySharepings, mypings));
      setSharing(isIdExisting(mySharepings, mypings));
    }
  }, [mySharepings]);

  if (!mypings && !pd) return <div>로딩중...</div>;

  return (
    <Base
      onClick={handleNavigate(navigator, `/${userId}/mypings/${mypings.id}`)}
      style={md?.id === Number(userId) ? { paddingBottom: 0, border: 'none' } : {}}
    >
      <div className={'info'}>
        <MyPingsImage>
          {mypings.title.slice(0, 1).toUpperCase()}
          {pd && pd?.length > 0 && <TotalCount current={`+ ${pd?.length}`} />}
        </MyPingsImage>
        <InfoZone>
          <h2>
            {mypings.title}
            {mypings.is_private === 1 && (
              <PillBox text={'🔒 Private'} style={{ fontSize: '11px', padding: '2px 6px 0', marginLeft: '5px' }} />
            )}
          </h2>
          {md && (
            <ShareButton
              onClick={actionHandler(
                isSharing ? 'deactivate' : 'activate',
                `/mypings/${mypings.id}/sharepings`,
                setSharing,
              )}
            >
              {isSharing ? (
                <MdOutlineBookmark style={{ color: '#f7523d' }} />
              ) : (
                <MdOutlineBookmarkBorder style={{ color: 'gray' }} />
              )}
            </ShareButton>
          )}
        </InfoZone>
      </div>
      {md?.id === Number(userId) && (
        <form onSubmit={onSubmit}>
          <ModifyActionButtons onEdit={onEdit(mypings.id)} onDelete={onDelete(mypings.id)} />
        </form>
      )}
    </Base>
  );
};

export default memo(MyPingsCard);

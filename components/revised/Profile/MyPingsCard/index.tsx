import React, { FC, memo } from 'react';
import styled from '@emotion/styled';
import { IMe, IMyPings } from '@typings/db';
import { useNavigate, useParams } from 'react-router-dom';
import { Base, ShowTotals, InfoZone, ImageZone } from '@components/revised/Profile/PostCard';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import TotalCount from '@components/revised/Home/TotalCount';
import ModifyActionButtons from '@components/revised/Profile/ModifyActionButtons';
import handleNavigate from '@utils/handleNavigate';

interface IProps {
  mypings: IMyPings;
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

const MyPingsCard: FC<IProps> = ({ mypings }) => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { data: md, mutate: mutateMd } = useSWR<IMe>(`/users/me`, fetcher);
  const { data: pd, mutate: mutateMypings } = useSWR<any>(`/users/${userId}/mypings/${mypings.id}/posts`, fetcher);

  const onSubmit = (e: any) => {
    e.preventDefault();
  };
  const onEdit = (id: number) => () => {
    console.log(id);
    handleNavigate(navigate, `/mypings/${mypings?.id}/edit`)();
  };

  const onDelete = (id: number) => () => {
    console.log(id);
  };

  if (!mypings) return <div>로딩중...</div>;

  return (
    <Base
      onClick={handleNavigate(navigate, `/${userId}/mypings/${mypings.id}`)}
      style={md?.id === Number(userId) ? { paddingBottom: 0, border: 'none' } : {}}
    >
      <div className={'info'}>
        <MyPingsImage>
          {mypings.title.slice(0, 1).toUpperCase()}
          {pd?.length && <TotalCount current={`+ ${pd?.length}`} />}
        </MyPingsImage>
        <InfoZone>
          <h2>{mypings.title}</h2>
        </InfoZone>
      </div>
      {md?.id === userId && (
        <form onSubmit={onSubmit}>
          <ModifyActionButtons id={mypings?.id} onEdit={onEdit} onDelete={onDelete} />
        </form>
      )}
    </Base>
  );
};

export default memo(MyPingsCard);

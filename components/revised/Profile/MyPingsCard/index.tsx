import React, { FC, memo } from 'react';
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
  console.log(mypings);

  const navigator = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { data: md, mutate: mutateMd } = useSWR<IMe>(`/users/me`, fetcher);
  const { data: pd, mutate: mutateMypings } = useSWR(`/mypings/12/posts`, fetcher);
  console.log('mypings-post', pd);
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

  if (!mypings) return <div>로딩중...</div>;

  return (
    <Base
      onClick={handleNavigate(navigator, `/${userId}/mypings/${mypings.id}`)}
      style={md?.id === Number(userId) ? { paddingBottom: 0, border: 'none' } : {}}
    >
      <div className={'info'}>
        <MyPingsImage>
          {mypings.title.slice(0, 1).toUpperCase()}
          {pd?.length > 0 && <TotalCount current={`+ ${pd?.length}`} />}
        </MyPingsImage>
        <InfoZone>
          <h2>
            {mypings.title}
            {mypings.is_private && (
              <PillBox text={'🔒 Private'} style={{ fontSize: '11px', padding: '2px 6px 0', marginLeft: '5px' }} />
            )}
          </h2>
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

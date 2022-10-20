import React, { FC, memo } from 'react';
import styled from '@emotion/styled';
import { IMyPings } from '@typings/db';
import { useNavigate, useParams } from 'react-router-dom';
import { Base, ShowTotals, InfoZone } from '@components/revised/Profile/PostCard';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import TotalCount from '@components/revised/Home/TotalCount';

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
  // const { data: mypings, mutate: mutateMypings } = useSWR<IMyPings>(`/users/${userId}/mypings`, fetcher);
  const { data: pd, mutate: mutateMypings } = useSWR<any>(`/users/${userId}/mypings/${mypings.id}/posts`, fetcher);

  const handleNavigate = (path: string) => () => navigate(path);

  console.log(pd);

  return (
    <Base onClick={handleNavigate(`/${userId}/mypings/${mypings.id}`)}>
      <MyPingsImage>
        {mypings.title.slice(0, 1).toUpperCase()}
        {pd?.length && <TotalCount current={`+ ${pd?.length}`} />}
      </MyPingsImage>
      <InfoZone>
        <h2>{mypings.title}</h2>
      </InfoZone>
    </Base>
  );
};

export default memo(MyPingsCard);

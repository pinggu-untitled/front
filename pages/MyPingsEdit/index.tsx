import React from 'react';
import { Base } from '@pages/Home';
import TitleNavigation from '@components/revised/common/navigations/TitleNavigation';
import { HighLight } from '@components/revised/Profile/EditModal';
import handleNavigate from '@utils/handleNavigate';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { IMyPings } from '@typings/db';
import fetcher from '@utils/fetcher';

const MyPingsEdit = () => {
  const { mypingsId } = useParams<{ mypingsId: string }>();
  // const { data: mypings, mutate: mutateMypings } = useSWR<IMyPings[]>(`/users/${userId}/mypings/${mypingsId}`, fetcher);
  const navigator = useNavigate();

  return (
    <Base>
      <TitleNavigation
        onClickPrev={handleNavigate(navigator, `/${mypingsId}/mypings`)}
        title={
          <>
            내 마이핑스 <HighLight>({10})</HighLight>
          </>
        }
      />
    </Base>
  );
};

export default MyPingsEdit;

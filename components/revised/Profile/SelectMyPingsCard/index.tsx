import React, { FC, memo, useCallback } from 'react';
import styled from '@emotion/styled';
import { IMyPings, IPost } from '@typings/db';
import { useNavigate, useParams } from 'react-router-dom';
import { BsCheck } from 'react-icons/bs';
import { InfoZone } from '@components/revised/Home/PostCard';
import { Base } from '../PostCard';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import TotalCount from '@components/revised/Home/TotalCount';
import { MyPingsImage } from '@components/revised/Profile/MyPingsCard';
import { DeleteAction, EditAction } from '../SelectPostCard';
import PillBox from '@components/revised/PillBox';

interface IProps {
  mypings: IMyPings;
  isChecked: boolean;
  handleCheck: any;
}

export const ActionZone = styled.div`
  display: flex;
`;

const SelectMyPingsCard: FC<IProps> = ({ mypings, isChecked, handleCheck }) => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => () => navigate(path);
  const { userId, mypingsId } = useParams<{ userId: string; mypingsId: string }>();
  const { data: pd, mutate: mutatePd } = useSWR<IPost[]>(`/users/${userId}/mypings/${mypingsId}/posts`, fetcher);
  console.log(pd);
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  return (
    <Base onClick={handleNavigate(`/${userId}/mypings/${mypings.id}`)}>
      <div className={'info'}>
        <MyPingsImage>
          {mypings.title.slice(0, 1).toUpperCase()}
          {pd && pd?.length > 0 && <TotalCount current={`+ ${pd?.length}`} />}
        </MyPingsImage>
        <InfoZone>
          <h2>
            {mypings.title}
            <PillBox text={'🔒 Private'} style={{ fontSize: '11px', padding: '2px 6px 0', marginLeft: '5px' }} />
          </h2>
        </InfoZone>
      </div>
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

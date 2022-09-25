import React, { memo, useCallback } from 'react';
import styled from '@emotion/styled';
import { IoCloseOutline } from 'react-icons/io5';
import { IHistory } from '@typings/db';
import PillItem from '@components/common/items/PillItem';

interface IProps {
  data: IHistory;
  onClick: (data: IHistory) => void;
  onDelete?: (id: number) => void;
}
export const Pill = styled.li`
  display: flex;
  align-items: center;
  padding: 0 3px 0 10px;
  height: 33px;
  border: 1px solid #dfdfdf;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  position: relative;

  & .content {
    transform: translateY(1px);
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & .content {
    transform: translateY(1px);
  }
`;

export const DeleteButton = styled.div`
  height: 27px;
  width: 27px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  margin-left: 3px;
  transition: 0.2s;
  transform: translateX(8px);

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const SearchHistoryPill = ({ data, onClick, onDelete }: IProps) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  return (
    <PillItem onClick={() => onClick(data)}>
      <Content>
        <span className={'content'}>{data.content}</span>
        {onDelete && (
          <div onClick={stopPropagation}>
            <DeleteButton onClick={() => onDelete(data.id)}>
              <IoCloseOutline />
            </DeleteButton>
          </div>
        )}
      </Content>
    </PillItem>
  );
};

export default memo(SearchHistoryPill);

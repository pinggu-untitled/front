import React, { FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  id?: number;
  onEdit: (id: number) => () => void;
  onDelete: (id: number) => () => void;
}

export const Base = styled.div`
  width: 100%;
  display: flex;
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  margin-top: 10px;

  > button:not(:last-of-type) {
    border-right: 1px solid #dfdfdf;
  }
`;
export const Button = styled.button`
  flex: 1;
  padding: 10px 0;
  font-size: 14px;
  font-weight: 700;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const ModifyActionButtons: FC<IProps> = ({ id, onEdit, onDelete }) => {
  const stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  if (!id) return <div>로딩중...</div>;
  return (
    <Base onClick={stopPropagation}>
      <Button onClick={onEdit(id)}>수정</Button>
      <Button onClick={onEdit(id)} style={{ color: '#f7523d' }}>
        삭제
      </Button>
    </Base>
  );
};

export default ModifyActionButtons;

import React from 'react';
import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

interface IProps {
  control: any;
  name: string;
  content: string;
  action: {
    type: 'select' | 'remove';
    handler: any;
  };
}

export const Base = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ActionButton = styled.div``;

const SearchResultInput = ({ control, name, content, action }: IProps) => {
  return (
    <Base>
      <span>{content}</span>
      <Controller control={control} name={name} render={({ field }) => <input type={'checkbox'} {...field} />} />
      <ActionButton onClick={action.handler}>{action.type === 'select' ? '선택' : '삭제'}</ActionButton>
    </Base>
  );
};

export default SearchResultInput;

import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import styled from '@emotion/styled';

interface IProps {
  control: any;
  label: string;
  name: string;
}

export const Base = styled.label`
  display: flex;
  flex-direction: column;

  & .label {
    font-size: 14px;
    margin-bottom: 4px;
    color: gray;
  }
`;
export const Input = styled.input`
  padding: 12px;
  font-size: 15px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;

  &:focus {
    outline: none;
  }
`;
const FixedLabelInput: FC<IProps> = ({ control, label, name }) => {
  return (
    <Base>
      <span className={'label'}>{label}</span>
      <Controller
        control={control}
        name={name}
        render={({ field }) => <Input value={field.value} onChange={field.onChange} />}
      />
    </Base>
  );
};

export default FixedLabelInput;

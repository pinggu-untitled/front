import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Controller } from 'react-hook-form';

interface IProps {
  label: string;
  name: string;
  control: any;
  data: { id: number; title: string }[];
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
export const Select = styled.select`
  padding: 12px;
  font-size: 15px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;

  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';

  &:focus {
    outline: none;
  }
`;

const SelectBox: FC<IProps> = ({ control, label, name, data }) => {
  return (
    <Base>
      <span className={'label'}>{label}</span>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select {...field}>
            {data.map((option, i) => (
              <option key={i} value={option.id}>
                {option.title}
              </option>
            ))}
          </Select>
        )}
      />
    </Base>
  );
};

export default SelectBox;

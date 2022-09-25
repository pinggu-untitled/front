import React, { ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';
import { Controller, useController } from 'react-hook-form';
import { useTheme } from '@emotion/react';

interface IProps {
  control: any;
  type?: 'text' | 'email' | 'password';
  label: string;
  name: string;
  rules?: Object;
}

export const InputContainer = styled.label<{ active: boolean }>`
  display: block;
  width: 100%;
  position: relative;

  & .label {
    display: inline-block;
    position: absolute;
    left: ${({ active }) => (active ? '8px' : '14px')};
    top: ${({ active }) => (active ? '-7px' : '12px')};
    padding: ${({ active }) => (active ? '0 8px 0  4px' : 0)};
    font-size: ${({ active }) => (active ? '12px' : '15px')};
    transition: 0.2s;
    background-color: #fff;
    color: gray;
  }

  & input {
    width: 100%;
    padding: ${({ active }) => (active ? '13px 12px 11px' : '12px')};

    font-size: 15px;
    border: 1px solid #dfdfdf;
    border-radius: 4px;

    &:focus {
      outline: none;
    }
  }
`;

const MovingLabelInput = ({ control, type = 'text', label, name, rules }: IProps) => {
  const theme = useTheme();
  const {
    field,
    formState: { errors },
  } = useController({ name, control, rules });

  return (
    <InputContainer theme={theme} active={Boolean(field.value)}>
      <span className={'label'}>{label}</span>
      <input
        type={type}
        name={field.name}
        value={field.value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          field.onChange(e.target.value);
        }}
        autoFocus={true}
      />
    </InputContainer>
  );
};

export default MovingLabelInput;

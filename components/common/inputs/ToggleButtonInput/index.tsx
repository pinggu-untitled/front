import React, { ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';
import { Controller } from 'react-hook-form';
import { useTheme } from '@emotion/react';

interface IProps {
  control: any;
  name: string;
}

export const Button = styled.label<{ active: boolean; theme: any }>`
  display: flex;
  width: 50px;
  border-radius: 20px;
  align-items: center;
  padding: 3px;
  background-color: ${({ theme, active }) => (active ? '#0295f6' : '#8e8e8e')};
  cursor: pointer;
`;

export const SlidingBall = styled.div<{ active: boolean }>`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: #fff;
  transform: ${({ active }) => active && 'translateX(18px)'};
  transition: 0.2s;
`;

const ToggleButtonInput = ({ control, name }: IProps) => {
  const theme = useTheme();
  const [sliding, setSliding] = useState<boolean>(control._defaultValues[name]);
  return (
    <Button active={sliding} theme={theme}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            type={'checkbox'}
            checked={field.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              field.onChange(e.target.checked);
              setSliding((p) => !p);
            }}
            hidden
          />
        )}
      />
      <SlidingBall theme={theme} active={sliding} />
    </Button>
  );
};

export default ToggleButtonInput;

import React, { ChangeEvent, CSSProperties, useState } from 'react';
import styled from '@emotion/styled';
import { Controller, useController } from 'react-hook-form';
import { useTheme } from '@emotion/react';

interface IProps {
  control: any;
  name: string;
  style?: CSSProperties;
}

export const Button = styled.label<{ active: boolean; theme: any }>`
  display: flex;
  width: 50px;
  border-radius: 20px;
  align-items: center;
  padding: 3px;
  //height: 32px;
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

const ToggleButtonInput = ({ control, name, style }: IProps) => {
  const theme = useTheme();
  const { field } = useController({ control, name });
  const [sliding, setSliding] = useState<boolean>(field.value);
  return (
    <Button active={sliding} theme={theme} style={style}>
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

import React, { ChangeEvent, CSSProperties, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Controller, useController } from 'react-hook-form';
import { useTheme } from '@emotion/react';

interface IProps {
  control: any;
  name: string;
  messages: { checked: string; unChecked: string };
  style?: CSSProperties;
}

export const Button = styled.label<{ active: boolean; theme: any }>`
  display: flex;
  padding: 3px;
  height: 30px;
  border-radius: 20px;
  align-items: center;
  background-color: ${({ theme, active }) => (active ? '#0295f6' : '#8e8e8e')};
  cursor: pointer;
`;

export const MessageZone = styled.div<{ active: boolean }>`
  //width: 100%;
  height: 100%;
  width: 72px;
  border-radius: 20px;
  //background-color: red;
  display: flex;
  align-items: center;
  color: ${({ active }) => (active ? '#fff' : 'rgba(255,255,255,0.8)')};

  > .message {
    position: absolute;
    font-size: 12px;
    font-weight: 600;
    transform: ${({ active }) => (!active ? 'translate(26px, 1px)' : 'translate(6px,1px)')};
  }
`;

export const SlidingBall = styled.div<{ active: boolean }>`
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background-color: #fff;
  transform: ${({ active }) => active && 'translateX(53px)'};
  transition: 0.2s;
`;

const TextToggleButtonInput = ({ messages, control, name, style }: IProps) => {
  const theme = useTheme();
  const { field } = useController({ control, name });
  const [sliding, setSliding] = useState<boolean>(field.value);

  useEffect(() => {
    setSliding(field.value);
  }, [field]);

  return (
    <Button active={sliding} theme={theme} style={style}>
      <Controller
        control={control}
        name={name}
        defaultValue={field.value}
        render={({ field }) => (
          <input
            hidden
            type={'checkbox'}
            checked={field.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              field.onChange(e.target.checked);
              setSliding((p) => !p);
            }}
          />
        )}
      />
      <MessageZone active={sliding}>
        <span className={'message'}>{sliding ? messages.checked : messages.unChecked}</span>
        <SlidingBall theme={theme} active={sliding} />
      </MessageZone>
    </Button>
  );
};

export default TextToggleButtonInput;

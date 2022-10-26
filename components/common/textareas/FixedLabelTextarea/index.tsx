import React, { FC, useCallback, useEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';
import styled from '@emotion/styled';
import autosize from 'autosize';

interface IProps {
  control: any;
  label: string;
  name: string;
  placeholder?: string;
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
export const Textarea = styled.textarea`
  padding: 12px;
  min-height: 200px;
  font-size: 15px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  resize: none;
  font-family: inherit;
  &:focus {
    outline: none;
  }
`;

export const onKeyPress = (e: any) => {
  if (e.key === 'Enter') {
    if (!e.shiftKey) {
      e.preventDefault();
    }
  }
};

const FixedLabelTextarea: FC<IProps> = ({ control, label, name, placeholder }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, [textareaRef]);

  return (
    <Base>
      <span className={'label'}>{label}</span>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Textarea
            ref={textareaRef}
            value={field.value}
            onChange={field.onChange}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
          />
        )}
      />
    </Base>
  );
};

export default FixedLabelTextarea;

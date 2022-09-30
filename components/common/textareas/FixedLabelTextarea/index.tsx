import React, { FC, useCallback, useEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';
import styled from '@emotion/styled';
import autosize from 'autosize';

interface IProps {
  control: any;
  label: string;
  name: string;
  onSubmit?: () => void;
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

const FixedLabelTextarea: FC<IProps> = ({ control, label, name, onSubmit }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      onSubmit && onSubmit();
      e.preventDefault();
    }
  }, []);

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
          <Textarea ref={textareaRef} value={field.value} onChange={field.onChange} onKeyPress={handleKeyPress} />
        )}
      />
    </Base>
  );
};

export default FixedLabelTextarea;

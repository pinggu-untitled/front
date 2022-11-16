import { useEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';
import autosize from 'autosize';
import { Label } from '@components/PostNew/Input/style';

interface IProps {
  control: any;
  label: string;
  name: string;
  placeholder?: string;
}

export const onKeyPress = (e: any) => {
  if (e.key === 'Enter') {
    if (!e.shiftKey) {
      e.preventDefault();
    }
  }
};

const TextareaController = ({ control, label, name, placeholder }: IProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, [textareaRef]);

  return (
    <Label>
      <span className={'label'}>{label}</span>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <textarea
            ref={textareaRef}
            value={field.value}
            onChange={field.onChange}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
          />
        )}
      />
    </Label>
  );
};

export default TextareaController;

import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Label } from '@components/PostNew/Input/style';

interface IProps {
  label: string;
  value: string;
  onChange: (e: any) => void;
}

const Input = ({ label, value, onChange }: IProps) => {
  return (
    <Label>
      <span className={'label'}>{label}</span>
      <input type={'text'} value={value} onChange={onChange} />
    </Label>
  );
};

export default Input;

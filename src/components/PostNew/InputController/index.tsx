import { Controller } from 'react-hook-form';
import { Label } from '@components/PostNew/Input/style';

interface IProps {
  control: any;
  label: string;
  name: string;
  defaultValue?: string;
}

const FixedLabelInput = ({ control, label, name }: IProps) => {
  return (
    <Label>
      <span className={'label'}>{label}</span>
      <Controller
        control={control}
        name={name}
        render={({ field }) => <input value={field.value} onChange={field.onChange} />}
      />
    </Label>
  );
};

export default FixedLabelInput;

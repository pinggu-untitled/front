import React from 'react';
import SelectMultiple from 'react-select';
import { Controller } from 'react-hook-form';

interface IProps {
  label: string;
  name: string;
  values: string[];
  control: any;
}

const Multiselect = ({ label, name, values = [], control }: IProps) => {
  const options = values.map((value) => ({
    label: value,
    value: value,
  }));

  return (
    <div style={{ zIndex: '3000' }}>
      <label>{label}</label>
      <Controller
        name={'filter'}
        control={control}
        render={({ field: { value, onChange, onBlur } }) => {
          return (
            <SelectMultiple
              options={options}
              placeholder={'필터'}
              isMulti={true}
              onChange={(options) => onChange(options?.map((option) => option.value))}
              onBlur={onBlur}
              value={options.filter((option) => value?.includes(option.value))}
              defaultValue={options.filter((option) => value?.includes(option.value))}
            />
          );
        }}
      />
    </div>
  );
};

export default Multiselect;

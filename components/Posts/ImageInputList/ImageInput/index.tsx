import React, { FC, useCallback, useState } from 'react';
import { Controller, useController } from 'react-hook-form';
import styled from '@emotion/styled';
import { FaCamera } from 'react-icons/fa';
interface IProps {
  control: any;
  name: string;
  maxCount?: number;
}
export const Base = styled.label`
  width: 100%;
  height: 100%;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.8);
  & .icon {
    font-size: 20px;
  }
  & .count {
    font-size: 13px;
    margin-top: 5px;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
`;

const ImageInput: FC<IProps> = ({ control, name, maxCount }) => {
  const { field } = useController({ control, name });
  const [count, setCount] = useState(field.value.length);
  return (
    <Base>
      <span className={'icon'}>
        <FaCamera />
      </span>
      <span className={'count'}>
        {count}/{maxCount}
      </span>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            type={'file'}
            onChange={(e: any) => {
              field.onChange(e.target.files);
              setCount(e.target.files.length);
            }}
            multiple={true}
            hidden
          />
        )}
      />
    </Base>
  );
};

export default ImageInput;

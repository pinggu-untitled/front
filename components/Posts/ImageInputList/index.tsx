import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useFieldArray } from 'react-hook-form';
import ImageInput from '@components/Posts/ImageInputList/ImageInput';

interface IProps {
  control: any;
  name: string;
}

export const Base = styled.div`
  > ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 6px;
    gap: 6px;
    width: 100%;
    height: 100px;
    border: 1px solid #dfdfdf;
    border-radius: 4px;
  }
`;

const ImageInputList: FC<IProps> = ({ control, name }) => {
  const { fields, remove } = useFieldArray({ control, name });
  return (
    <Base>
      <ul>
        <ImageInput control={control} name={name} maxCount={8} />
        {fields.map((field) => (
          <div>...</div>
        ))}
      </ul>
    </Base>
  );
};

export default ImageInputList;

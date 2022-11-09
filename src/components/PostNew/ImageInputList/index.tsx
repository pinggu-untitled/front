import React, { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useFieldArray, Controller, useController } from 'react-hook-form';
import { FaCamera } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import imagePreviewPromisfier, { fileReaderPromise } from '@utils/imagePreviewPromisfier';
import ImagePreview from '@components/PostNew/ImageInputList/ImagePreview';

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
    border: 1px solid #dfdfdf;
    border-radius: 4px;
  }
`;

export const FileDropper = styled.label`
  width: 100%;
  height: 88px;
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

    > .highlight {
      color: #0295f6;
    }
  }
  > input {
    width: 100%;
    height: 100%;
  }
`;

const ImageInputList: FC<IProps> = ({ control, name }) => {
  const { remove, append } = useFieldArray({ control, name });
  const [previews, setPreviews] = useState<any[]>([]);
  const { field } = useController({ control, name });

  const addFiles = (files: FileList) => Array.from(files).forEach((file) => append(file));

  const handleChange = (files: FileList) => {
    addFiles(files);
  };

  useEffect(() => {
    const files = Promise.all(
      Array.from(field.value).map((file: any) => {
        if (typeof file === 'string') {
          return new Promise((resolve) => resolve(file));
        } else {
          return fileReaderPromise(file);
        }
      }),
    );
    files.then((res) => {
      setPreviews(res);
    });
  }, [field.value]);

  return (
    <Base>
      <ul>
        <FileDropper>
          <span className={'icon'}>
            <FaCamera />
          </span>
          <span className={'count'}>
            <span className={'highlight'}>{field.value.length}</span>/8
          </span>
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <input type={'file'} onChange={(e: any) => handleChange(e.target.files)} multiple={true} hidden />
            )}
          />
        </FileDropper>
        {previews.length >= 1 &&
          previews?.map((preview: string, i) => {
            const isNew = preview.startsWith('data:image');
            const baseUrl = 'http://localhost:8080/uploads';
            return (
              <ImagePreview
                key={`${preview}.${i}`}
                src={isNew ? preview : `${baseUrl}/${preview}`}
                onClose={() => remove(i)}
              />
            );
          })}
      </ul>
    </Base>
  );
};

export default ImageInputList;

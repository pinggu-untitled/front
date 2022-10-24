import React, { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useFieldArray, Controller, useController } from 'react-hook-form';
import { FaCamera } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import imagePreviewPromisfier, { fileReaderPromise } from '@utils/imagePreviewPromisfier';
import ImagePreview from '@components/revised/PostsNewEdit/ImageInputList/ImagePreview';

interface IProps {
  images: any[];
  setImages: Dispatch<SetStateAction<any[]>>;
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

const ImageInputList = ({ images, setImages }: IProps) => {
  const { postId } = useParams<{ postId: string }>();
  // const { remove, append } = useFieldArray({ control, name });
  // const { field } = useController({ control, name });
  const [previews, setPreviews] = useState<any[]>(images);

  useEffect(() => {
    const files = Promise.all(
      Array.from(images).map((file: any) => {
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

    return () => {};
  }, [images, setImages]);

  const onAdd = (e: any) => setImages((prev) => [...prev, ...e.target.files]);

  const onRemove = (index: number) => (e: any) => setImages((prev) => prev.filter((_, i) => i !== index));

  // const appendFiles = (files: FileList) => Array.from(files).forEach((file) => append(file));
  // const appendPreviews = (files: FileList) => {
  //   imagePreviewPromisfier(files).then((res: any) => {
  //     return setPreviews((prev) => (Array.isArray(prev) ? [...prev, ...res] : [...prev, res]));
  //   });
  // };

  // const handleChange = useCallback((files) => {
  //   appendFiles(files);
  //   // appendPreviews(files);
  // }, []);

  // const onRemove = useCallback(
  //   (i: number) => {
  //     remove(i);
  //     // setPreviews((p) => p.filter((_, idx) => i !== idx));
  //   },
  //   [previews],
  // );

  return (
    <Base>
      <ul>
        <FileDropper>
          <span className={'icon'}>
            <FaCamera />
          </span>
          <span className={'count'}>
            <span className={'highlight'}>{images.length}</span>/8
          </span>
          <input type={'file'} onChange={onAdd} multiple={true} hidden />
        </FileDropper>
        {previews.length >= 1 &&
          previews?.map((preview: string, i) => {
            const isNew = preview.startsWith('data:image');
            const baseUrl = 'http://localhost:8080/uploads';
            return (
              <ImagePreview
                key={`${preview}.${i}`}
                src={isNew ? preview : `${baseUrl}/${preview}`}
                onClose={onRemove(i)}
              />
            );
          })}
      </ul>
    </Base>
  );
};

export default ImageInputList;

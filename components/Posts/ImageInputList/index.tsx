import React, { FC, useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useFieldArray, Controller, useController } from 'react-hook-form';
import ImagePreview from '@components/Posts/ImageInputList/ImagePreview';
import { FaCamera } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

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
  const { postId } = useParams<{ postId: string }>();
  const { data: pd, mutate: mutatePd } = useSWR(postId ? `/posts/${postId}` : null, fetcher);

  const { fields, remove, append } = useFieldArray({ control, name });

  const [previews, setPreviews] = useState<any[]>(pd?.post?.Images?.map((im: { src: string }) => im.src) || []);

  // const [showModals, setShowModals] = useState<{ [key: string]: boolean }>({ showImagesZoomModal: false });
  // const handleModal = useCallback((modalName: string) => {
  //   setShowModals((p) => ({ ...p, [modalName]: !p[modalName] }));
  // }, []);

  useEffect(() => {
    if (previews.length) {
      for (let preview of previews) {
        append({ src: preview });
      }
    }
  }, []);

  const handleChange = useCallback((files) => {
    console.log('FILES', files);
    for (let file of files) {
      append(file);
    }
  }, []);

  const handlePreview = useCallback((files) => {
    if (!files) return;

    const promisify = (files: FileList) => {
      return Promise.all(
        Array.from(files).map(
          (file: any) =>
            new Promise((resolve, reject) => {
              const fileReader = new FileReader();
              fileReader.readAsDataURL(file);
              fileReader.onload = (e) => resolve(fileReader.result);
            }),
        ),
      );
    };

    promisify(files).then((res) => {
      setPreviews((p) => [...p, ...res]);
    });
  }, []);

  const onRemove = useCallback(
    (i: number) => {
      remove(i);
      setPreviews((p) => p.filter((_, idx) => i !== idx));
    },
    [previews],
  );

  return (
    <Base>
      <ul>
        <FileDropper>
          <span className={'icon'}>
            <FaCamera />
          </span>
          <span className={'count'}>
            <span className={'highlight'}>{previews.length}</span>/8
          </span>
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <input
                type={'file'}
                onChange={(e) => {
                  handleChange(e.target.files);
                  handlePreview(e.target.files);
                  e.target.value = '';
                }}
                multiple={true}
                hidden
              />
            )}
          />
        </FileDropper>
        {previews?.map((pv: string, i) => {
          const isNew = pv.startsWith('data:image');
          return (
            <ImagePreview
              key={`${pv}.${i}`}
              src={isNew ? pv : `http://localhost:8080/uploads/${pv}`}
              onClose={() => onRemove(i)}
            />
          );
        })}
      </ul>
    </Base>
  );
};

export default ImageInputList;

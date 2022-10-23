import React, { FC, useCallback, useState } from 'react';
import { Controller, useController } from 'react-hook-form';
import styled from '@emotion/styled';
import imagePreviewPromisfier from '@utils/imagePreviewPromisfier';

interface IProps {
  control: any;
  name: string;
}

export const Base = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ProfileImageWrapper = styled.label`
  width: 120px;
  height: 120px;
  border: 1px solid #dfdfdf;
  display: block;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  > .text {
    width: 100%;
    height: 36px;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    visibility: hidden;
    opacity: 0;
    transition: 0.2s;
  }

  &:hover > .text {
    visibility: visible;
    opacity: 1;
    transition: 0.2s;
  }
`;

const ProfileImageInput: FC<IProps> = ({ control, name }) => {
  const { field } = useController({ control, name });
  const [preview, setPreview] = useState(field.value);
  const handlePreview = useCallback((files) => {
    imagePreviewPromisfier(files).then((res) => {
      setPreview(res);
    });
  }, []);

  // console.log(control._defaultValues.profile_image_file);
  return (
    <Base>
      <ProfileImageWrapper>
        <img src={preview || control._defaultValues.profile_image_file || '/public/placeholder.png'} alt={name} />
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <input
              type={'file'}
              onChange={(e) => {
                field.onChange(e.target.files);
                handlePreview(e.target.files);
              }}
              hidden
            />
          )}
        />
        <div className={'text'}>편집하기</div>
      </ProfileImageWrapper>
    </Base>
  );
};

export default ProfileImageInput;

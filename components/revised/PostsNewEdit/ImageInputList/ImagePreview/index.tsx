import React, { FC, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { IoIosClose } from 'react-icons/io';
import ImagesZoomModal from '@components/common/image-related/ImagesZoomModal';

interface IProps {
  src: string;
  onClose: (e: any) => void;
}

export const Base = styled.div`
  position: relative;
  width: 100%;
  height: 88px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-size: 20px;
  border-radius: 50%;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  & .icon {
    font-size: 20px;
  }
`;

const ImagePreview: FC<IProps> = ({ src, onClose }) => {
  const handleClose = (e: any) => {
    e.stopPropagation();
    onClose(e);
  };

  return (
    <>
      <Base>
        <img src={src} alt={'upload-image-preview'} />
        <CloseButton onClick={handleClose}>
          <IoIosClose />
        </CloseButton>
      </Base>
    </>
  );
};

export default ImagePreview;

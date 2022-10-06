import React, { FC } from 'react';
import styled from '@emotion/styled';
import { IoIosClose } from 'react-icons/io';

interface IProps {
  src: string;
  onClose: () => void;
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

  &:hover {
    //background-color: rbga(255, 255, 255, 1);
    background-color: red;
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
  & .icon {
    font-size: 20px;
  }
`;

const ImagePreview: FC<IProps> = ({ src, onClose }) => {
  return (
    <Base>
      <img src={src} />
      <CloseButton onClick={onClose}>
        <IoIosClose />
      </CloseButton>
    </Base>
  );
};

export default ImagePreview;

import React, { FC } from 'react';
import styled from '@emotion/styled';
import { IoCloseOutline } from 'react-icons/io5';
import { IImage } from '@typings/db';
import Modal from '@components/Modal';

interface IProps {
  show: boolean;
  onCloseModal: () => void;
  images?: IImage[];
}

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  display: flex;
  align-items: center;
  overflow: scroll;
  width: 500px;

  > img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

export const CloseButton = styled.div`
  color: #fff;
  position: absolute;
  top: 50px;
  right: 50px;
  font-size: 60px;
  cursor: pointer;
  z-index: 1000;

  &:active {
    color: lightgray;
  }
`;

const ImagesZoomModal: FC<IProps> = ({ show, onCloseModal, images }) => {
  return (
    <Modal show={show} style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
      <CloseButton onClick={onCloseModal}>
        <IoCloseOutline />
      </CloseButton>
      <ModalContent>
        {images?.map((img, i) => (
          <img
            key={img.id}
            src={`http://localhost:8080/uploads/${img.src}`}
            alt={`${img.id}`}
          />
        ))}
      </ModalContent>
    </Modal>
  );
};

export default ImagesZoomModal;

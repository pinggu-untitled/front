import React, { FC } from 'react';
import FullScreenModal from '@components/common/modals/FullScreenModal';
import styled from '@emotion/styled';
import { IoCloseOutline } from 'react-icons/io5';

interface IProps {
  show: boolean;
  onCloseModal: () => void;
  images: { src: string }[];
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
  console.log(images);
  return (
    <FullScreenModal show={show} style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
      <CloseButton onClick={onCloseModal}>
        <IoCloseOutline />
      </CloseButton>
      <ModalContent>
        {images?.map((img, i) => (
          <img key={i} src={`http://localhost:8080/uploads/${img.src}`} alt="/" />
        ))}
      </ModalContent>
    </FullScreenModal>
  );
};

export default ImagesZoomModal;

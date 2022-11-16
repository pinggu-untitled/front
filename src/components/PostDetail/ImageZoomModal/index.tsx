import { FC } from 'react';
import styled from '@emotion/styled';
import { IoCloseOutline } from 'react-icons/io5';
import { IImage } from '@typings/db';
import Modal from '@components/Modal';
import mediaPath from '@utils/mediaPath';

interface IProps {
  show: boolean;
  onCloseModal: () => void;
  images?: IImage[];
}

export const ModalContent = styled.div`
  position: fixed;
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
    background-color: #191919;
  }
`;

export const CloseButton = styled.div`
  color: #fff;
  position: absolute;
  top: 50px;
  right: 50px;
  font-size: 60px;
  cursor: pointer;
  z-index: 4000;

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
      <ModalContent style={{ zIndex: '1000' }}>
        {images?.map((img) => (
          <img key={img.id} src={mediaPath('post', img.src)} alt={`${img.id}`} />
        ))}
      </ModalContent>
    </Modal>
  );
};

export default ImagesZoomModal;

import React, { FC, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { IoIosClose } from 'react-icons/io';
import ImagesZoomModal from '@components/common/image-related/ImagesZoomModal';

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
  cursor: pointer;

  & .icon {
    font-size: 20px;
  }
`;

const ImagePreview: FC<IProps> = ({ src, onClose }) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  const [showModals, setShowModals] = useState<{ [key: string]: boolean }>({ showImagesZoomModal: false });
  const handleModal = useCallback((modalName: string) => {
    setShowModals((p) => ({ ...p, [modalName]: !p[modalName] }));
  }, []);

  return (
    <>
      <Base onClick={() => handleModal('showImagesZoomModal')}>
        <img src={src} />
        <div onClick={stopPropagation}>
          <CloseButton onClick={onClose}>
            <IoIosClose />
          </CloseButton>
        </div>
      </Base>
      <ImagesZoomModal
        show={showModals.showImagesZoomModal}
        onCloseModal={() => handleModal('showImagesZoomModal')}
        images={[{ src: '/public/logo.png' }, { src: '/public/1.png' }]}
      />
    </>
  );
};

export default ImagePreview;

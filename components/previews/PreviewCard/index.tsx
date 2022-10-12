import React, { FC } from 'react';
import { Base, ImageWrapper } from './styles';

interface IProps {
  data: any;
}

const PreviewCard: FC<IProps> = ({ data }) => {
  return (
    <Base>
      <ImageWrapper>
        <img src={'/public/logo.png' || `http://localhost:8080/uploads/${data.src}`} alt="" />
      </ImageWrapper>
      <p className="title">{'제목 들어가는 곳' || data.title}</p>
    </Base>
  );
};

export default PreviewCard;

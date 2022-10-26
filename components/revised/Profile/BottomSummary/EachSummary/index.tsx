import React, { FC } from 'react';
import { ICheckedPost } from '@pages/ProfilePosts';
import styled from '@emotion/styled';
import { IoIosClose } from 'react-icons/io';
interface IProps {
  checkedPost: ICheckedPost;
  handleCheck: () => void;
}

export const Base = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  height: 38px;

  > .info-zone {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
  }
`;

export const ImageWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #dfdfdf;
  margin-right: 6px;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CloseButton = styled.div`
  font-size: 26px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;
  &:active {
    color: gray;
  }
`;

const EachSummary: FC<IProps> = ({ checkedPost, handleCheck }) => {
  return (
    <Base>
      <div className="info-zone">
        <ImageWrapper>
          <img src={`/public/1.png`} alt="" />
        </ImageWrapper>
        {checkedPost.title}
      </div>

      <CloseButton onClick={handleCheck}>
        <IoIosClose />
      </CloseButton>
    </Base>
  );
};

export default EachSummary;

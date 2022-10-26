import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { ICheckedPost } from '@pages/ProfilePosts';
import { v4 as uuid } from 'uuid';
import EachSummary from './EachSummary';

interface IProps {
  checkedPosts: ICheckedPost[];
  handleCheck: any;
}

export const Base = styled.div`
  position: fixed;
  bottom: 0;
  left: 68px;
  width: 440px;
  border-top: 1px solid #dfdfdf;
  background-color: #fff;
  z-index: 3000;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px -4px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 0px;

  > ul {
    border: 1px solid #dfdfdf;
    margin-bottom: 20px;
    border-radius: 4px;
    overflow: hidden;
    > li:not(:last-of-type) {
      border-bottom: 1px solid #dfdfdf;
    }
  }
`;

export const SlideButton = styled.div`
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 24px;
  border-radius: 4px 4px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dfdfdf;
  border-bottom: none;
  color: gray;
  cursor: pointer;
  background: #fff;
  z-index: 3000;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 36px;
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 4px;
  /* position: absolute; */
`;

const BottomSummary: FC<IProps> = ({ checkedPosts, handleCheck }) => {
  const [show, setShow] = useState(true);
  return (
    <Base>
      <SlideButton onClick={() => setShow((p) => !p)}>{show ? <IoIosArrowUp /> : <IoIosArrowDown />}</SlideButton>
      {show && checkedPosts.length > 0 && (
        <ul>
          {checkedPosts.map((post) => (
            <EachSummary key={uuid()} checkedPost={post} handleCheck={handleCheck(post)} />
          ))}
        </ul>
      )}
      <SubmitButton type="submit">삭제하기 ({checkedPosts.length})</SubmitButton>
    </Base>
  );
};

export default BottomSummary;

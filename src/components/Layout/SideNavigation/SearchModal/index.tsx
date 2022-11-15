import React, { FC } from 'react';
import styled from '@emotion/styled';
import { BsArrowLeft } from 'react-icons/bs';
import Modal from '@components/Modal';
import MenuList from '@components/Layout/MenuList';
import PagePrevHeader from '@components/headers/PagePrevHeader';
import { ActionButton, ActionList, Header } from '@components/headers/PageMainHeader/style';
import { SlArrowLeft } from 'react-icons/sl';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface IProps {
  show: boolean;
  onCloseModal: () => void;
}

export const Base = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 68px;
  width: 440px;
  z-index: 4000;
  background-color: #fff;
`;

export const CustomHeader = styled(Header)`
  border: none;
`;

export const Form = styled.form`
  width: calc(100% - 40px - 10px);

  > input[type='text'] {
    width: 100%;
    padding: 12px 16px;
    border-radius: 20px;
    border: 1px solid #dfdfdf;
    font-size: 15px;

    &:focus {
      outline: none;
    }
  }
`;
const SearchModal: FC<IProps> = ({ show, onCloseModal }) => {
  const navigate = useNavigate();
  if (!show) return null;
  return (
    <Modal size={'full'} show={show} onCloseModal={onCloseModal}>
      <Header>
        <ActionButton onClick={() => navigate(-1)}>
          <SlArrowLeft style={{ fontSize: '18px' }} />
        </ActionButton>
        <Form>
          <input type={'text'} autoFocus={true} placeholder={'검색'} />
          <input type={'submit'} hidden />
        </Form>
      </Header>
    </Modal>
  );
};

export default SearchModal;

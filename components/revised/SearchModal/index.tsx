import React, { FC } from 'react';
import FullScreenModal from '@components/revised/common/modals/FullScreenModal';
import styled from '@emotion/styled';
import { Base as Header, Button } from '@components/revised/common/navigations/DetailTopNavigation';
import { BsArrowLeft } from 'react-icons/bs';

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
  if (!show) return null;
  return (
    <Base>
      <CustomHeader>
        <Button onClick={onCloseModal}>
          <BsArrowLeft />
        </Button>
        <Form>
          <input type={'text'} autoFocus={true} placeholder={'검색'} />
          <input type={'submit'} hidden />
        </Form>
      </CustomHeader>
    </Base>
  );
};

export default SearchModal;

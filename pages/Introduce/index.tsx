import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import MovingLabelInput from '@components/common/inputs/MovingLabelInput';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import SquareButton from '@components/common/buttons/SquareButton';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Redirect } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Header from '@components/Intros/Header';

export const Base = styled.div`
  width: 100%;
  height: 100vh;
`;

export const Container = styled.div`
  padding: 100px 40px;

  & h1 {
    margin-bottom: 20px;
  }
`;

export const Form = styled.div`
  & label {
    margin-bottom: 10px;
  }
`;

interface IForm {
  email: string;
  password: string;
}
const Intro = () => {
  const navigate = useNavigate();

  return (
    <Base>
      <Header url={'/intro'} name={'인증하기'} />
      <Container>
        <h1>소개페이지</h1>
      </Container>
    </Base>
  );
};

export default Intro;

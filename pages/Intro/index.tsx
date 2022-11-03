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
  height: 100%;
`;

export const Container = styled.div`
  padding: 0 30px;
  width: 100%;
  margin: auto;
`;

const Main = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 310px;
  display: flex;
  flex-direction: column;
  & h1 {
    font-size: 22px;
    margin-bottom: 20px;
  }
`;

const SocialAuthButton = styled.a`
  width: 100%;
  height: 50px;
  border: 1px solid #dfdfdf;
  margin-bottom: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
`;

const Intro = () => {
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:8080';
  const { data: md, mutate: mutateMd } = useSWR('/users/me', fetcher);

  // if (md) navigate('/');

  return (
    <Base>
      <Header url={'/introduce'} name={'소개하기'} />
      <Container>
        <Main>
          <h1>로그인</h1>
          <SocialAuthButton href={`${baseUrl}/auth/login/kakao`}>카카오</SocialAuthButton>
          <SocialAuthButton href={`${baseUrl}/auth/login/google`}>구글</SocialAuthButton>
        </Main>
      </Container>
    </Base>
  );
};

export default Intro;

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
    font-size: 20px;
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

interface IForm {
  email: string;
  password: string;
}
const Intro = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<IForm>({ defaultValues: { email: '', password: '' } });
  const { data: userData, mutate } = useSWR('/users/me', fetcher);
  const onSubmit = useCallback((data: IForm) => {
    axios
      .post('/users/login', data)
      .then((res) => {
        console.log(res.data);
        mutate();
      })
      .catch((err) => console.error(err));
  }, []);

  // if (userData === undefined) return <div>로딩중...</div>;
  // if (userData) navigate('/');

  return (
    <Base>
      <Header url={'/introduce'} name={'소개하기'} />
      <Container>
        <Main>
          <h1>인증하기</h1>
          <SocialAuthButton href={'/intro'}>카카오</SocialAuthButton>
          <SocialAuthButton href={'/intro'}>구글</SocialAuthButton>
        </Main>
      </Container>
    </Base>
  );
};

export default Intro;

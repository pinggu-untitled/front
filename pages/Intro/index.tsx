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

  if (userData === undefined) return <div>로딩중...</div>;

  if (userData) navigate('/');

  return (
    <Base>
      <Container>
        <h1>로그인 및 회원가입</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <MovingLabelInput control={control} type="text" label={'이메일'} name={'email'} />
          <MovingLabelInput control={control} type="password" label={'패스워드'} name={'password'} />
          <SquareButton content={'로그인'} onClick={handleSubmit(onSubmit)} />
        </Form>
      </Container>
    </Base>
  );
};

export default Intro;

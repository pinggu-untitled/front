import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { ActionButton } from '@components/headers/PageMainHeader/style';
import { SlArrowLeft } from 'react-icons/sl';
import useInput from '@hooks/useInput';
import { useForm } from 'react-hook-form';
import Multiselect from '@components/Explore/MultiSelect';

export const Header = styled.header`
  // position: fixed;
  left: 73px;
  height: 70px;
  width: 440px;
  border: none;
  border-bottom: 1px solid #dfdfdf;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-right: 1px solid #dfdfdf;
  // z-index: 1000;

  > h2 {
    font-size: 18px;
  }
`;
export const Form = styled.form`
  width: calc(100% - 40px - 10px);
  display: flex;

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

interface IForm {
  filter: string[];
}

const Explore = () => {
  const navigate = useNavigate();
  const [value, onChangeValue] = useInput('');
  const ref = useRef<HTMLInputElement>(null);
  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!ref.current?.value) ref.current?.focus();
  }, [value]);

  const { handleSubmit, setValue, control, watch, reset } = useForm<IForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldUnregister: true,
    defaultValues: {
      filter: [],
    },
  });

  useEffect(() => {
    (() => {
      // await sleep(50);
      setValue('filter', ['content', 'user', 'post', 'mypings', 'hashtag'], { shouldValidate: true });
      // reset({ disciplines: ["bbb", "ccc"] });
    })();
  }, []);

  return (
    <>
      <Header>
        <ActionButton onClick={() => navigate(-1)}>
          <SlArrowLeft style={{ fontSize: '18px' }} />
        </ActionButton>
        <Form onSubmit={onSubmit}>
          <Multiselect
            name={'filter'}
            label={'filter'}
            control={control}
            values={['content', 'user', 'post', 'mypings', 'hashtag']}
          />
          <input value={value} onChange={onChangeValue} ref={ref} type={'text'} placeholder={'검색'} />
          <input type={'submit'} hidden />
        </Form>
      </Header>
    </>
  );
};

export default Explore;

import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { ActionButton } from '@components/headers/PageMainHeader/style';
import { SlArrowLeft } from 'react-icons/sl';
import useInput from '@hooks/useInput';
import { useForm } from 'react-hook-form';

export const Header = styled.header`
  position: fixed;
  left: 73px;
  height: 70px;
  width: 440px;
  border: none;
  border-bottom: 1px solid #dfdfdf;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: start;
  background-color: #fff;
  border-right: 1px solid #dfdfdf;

  > h2 {
    font-size: 18px;
  }
`;
export const Form = styled.form`
  width: calc(100% - 40px - 10px);
  border-radius: 20px;
  border: 1px solid #dfdfdf;
  display: flex;
  overflow: hidden;

  
  > input[type='text'] {
    width: 100%;
    padding: 12px 16px;
    font-size: 15px;
    border: none;
    
    &:focus {
      outline: none;
    }
  }
  
  > select {
    width: 120px;
    font-size: 11px;
    border:none;
    border-right: 1px solid #dfdfdf;
   
    &:focus {
      outline: none;
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
      setValue('filter', ['제목', '내용', '사용자', '마이핑스 카테고리', '해시태그'], { shouldValidate: true });
      // reset({ disciplines: ["bbb", "ccc"] });
    })();
  }, []);

  const selects = [
    { title: '제목', value: 'title' },
    { title: '내용', value: 'content' },
    {
      title: '사용자',
      value: 'user',
    },
    { title: '마이핑스 카테고리', value: 'category' },
    { title: '해시태그', value: 'hashtag' },
  ];

  return (
    <>
      <Header>
        <ActionButton onClick={() => navigate(-1)}>
          <SlArrowLeft style={{ fontSize: '18px' }} />
        </ActionButton>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <select>
            {selects.map((v, i) => (
              <option key={i} value={v.value} label={v.title} />
            ))}
          </select>
          <input value={value} onChange={onChangeValue} ref={ref} type={'text'} placeholder={'검색'} />

          {/*<Multiselect*/}
          {/*  name={'filter'}*/}
          {/*  value={''}*/}
          {/*  control={control}*/}
          {/*  values={['제목', '내용', '사용자', '마이핑스 카테고리', '해시태그']}*/}
          {/*/>*/}
          <input type={'submit'} hidden />
        </Form>
      </Header>
    </>
  );
};

export default Explore;

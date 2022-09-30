import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import PrevButtonTitleHeader from '@components/common/headers/PrevButtonTitleHeader';
import { useNavigate, useParams } from 'react-router-dom';
import FixedLabelInput from '@components/common/inputs/FixedLabelInput';
import FixedLabelTextarea from '@components/common/textareas/FixedLabelTextarea';
import axios from 'axios';
import SquareButton from '@components/common/buttons/SquareButton';
import ProfileImageInput from '@components/Profile/ProfileImageInput';
import ToggleButtonInput from '@components/common/inputs/ToggleButtonInput';
import TextToggleButtonInput from '@components/common/inputs/TextToggleButtonInput';
import PostUserProfile from '@components/Posts/PostUserProfile';
import { Private } from '@pages/PostsNew';

export const Base = styled.div`
  width: 100%;
`;

export const MainContentZone = styled.div`
  width: 440px;
  margin-top: 73px;
  padding: 20px 20px 0 20px;
`;

export const Form = styled.form`
  > label {
    margin-bottom: 20px;
  }

  > div {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
`;

interface IForm {
  title: string;
  category: string; // 선택
  is_private: boolean;
  posts: []; // 선택
}

const MyPingsNew = () => {
  const navigate = useNavigate();
  const { nickname } = useParams<{ nickname: string }>();
  const ud = { id: 1, nickname: '아무개', bio: '나는야 아무개', profile_image_url: '/public/1.png' };

  const { control, handleSubmit } = useForm<IForm>({
    defaultValues: {
      title: '',
      category: '',
      is_private: false,
      posts: [],
    },
  });

  const onSubmit = useCallback(() => {}, []);

  return (
    <Base>
      <PrevButtonTitleHeader title="마이핑스 만들기" onClick={() => navigate('/')} />
      <MainContentZone>
        <Form onSubmit={onSubmit}>
          <PostUserProfile user={ud}>
            <TextToggleButtonInput
              control={control}
              name={'is_private'}
              messages={{ checked: '모두에게', unChecked: '나에게만' }}
            />
          </PostUserProfile>
          <FixedLabelInput control={control} label={'제목'} name={'title'} />
          <FixedLabelInput control={control} label={'카테고리'} name={'category'} />

          <SquareButton type={'submit'} content={'완료'} onClick={onSubmit} />
        </Form>
      </MainContentZone>
    </Base>
  );
};

export default MyPingsNew;

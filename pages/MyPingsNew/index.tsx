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
import UserProfileCard from '@components/common/profiles-related/UserProfileCard';
import { Private } from '@pages/PostsNew';
import SquareSubmitButton from '@components/common/buttons/SquareSubmitButton';
import SelectBox from '@components/common/selects/SelectBox';

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
  posts: { id: number; title: string }[]; // 선택
}

const MyPingsNew = () => {
  const navigate = useNavigate();
  const { nickname } = useParams<{ nickname: string }>();
  const ud = { id: 1, nickname: '아무개', bio: '나는야 아무개', profile_image_url: '/public/1.png' };

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IForm>({
    defaultValues: {
      title: '',
      category: '',
      is_private: false,
      posts: [{ id: 1, title: 'good' }],
    },
  });

  const { title, category, is_private, posts } = watch();
  const isSubmitAvailable = Boolean(title);
  const onSubmit = useCallback(() => {}, []);
  console.log(category);
  return (
    <Base>
      <PrevButtonTitleHeader title="마이핑스 만들기" onClick={() => navigate('/')} />
      <MainContentZone>
        <Form onSubmit={onSubmit}>
          <UserProfileCard user={ud}>
            <TextToggleButtonInput
              control={control}
              name={'is_private'}
              messages={{ checked: '모두에게', unChecked: '나에게만' }}
            />
          </UserProfileCard>
          <FixedLabelInput control={control} label={'제목'} name={'title'} />
          {/*<FixedLabelInput control={control} label={'카테고리'} name={'category'} />*/}
          <SelectBox
            label={'카테고리'}
            name={'category'}
            control={control}
            data={[
              { id: 1, title: '나의 마이핑스1' },
              { id: 2, title: '나의 마이핑스2' },
            ]}
          />
          <SquareSubmitButton content={'만들기'} valid={isSubmitAvailable} />
        </Form>
      </MainContentZone>
    </Base>
  );
};

export default MyPingsNew;

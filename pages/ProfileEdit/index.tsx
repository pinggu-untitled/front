import React, { useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import FixedLabelInput from '@components/common/inputs/FixedLabelInput';
import FixedLabelTextarea from '@components/common/textareas/FixedLabelTextarea';
import axios from 'axios';
import SquareButton from '@components/common/buttons/SquareButton';
import ProfileImageInput from '@components/Profile/ProfileImageInput';
import TitleNavigation from '@components/revised/common/navigations/TitleNavigation';
import makeFormData from '@utils/makeFormData';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import handleNavigate from '@utils/handleNavigate';
import { IUser } from '@typings/db';

export const Base = styled.div`
  width: 100%;
`;

export const MainContentZone = styled.div`
  width: 440px;
  margin-top: 73px;
  padding: 20px 40px 20px;
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
  nickname: string;
  bio: string;
  profile_image_file: any;
}

const ProfileEdit = () => {
  const navigator = useNavigate();
  const { nickname } = useParams<{ nickname: string }>();
  const { data: md } = useSWR<IUser>('/users/me', fetcher);
  const { control, handleSubmit, setValue } = useForm<IForm>({
    defaultValues: {
      nickname: '',
      bio: '',
      profile_image_file: '',
    },
  });

  const onSubmit = useCallback(async (data: IForm) => {
    const filename = await axios.post(`/users/${nickname}/images`, makeFormData('image', data.profile_image_file), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    // const newPost = await axios.patch('/users', { ...data, image: filename?.data ?? null });
    // console.log(newPost.data);
  }, []);

  useEffect(() => {
    if (md) {
      setValue('nickname', md.nickname);
      setValue('bio', md.bio);
      setValue('profile_image_file', md.profile_image_url);
    }
  }, [md]);

  return (
    <Base>
      <TitleNavigation onClickPrev={handleNavigate(navigator, `/${md?.id}`)} title={'내 프로필 수정하기'} />
      <MainContentZone>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ProfileImageInput control={control} name={'profile_image'} />
          <FixedLabelInput control={control} label={'닉네임'} name={'nickname'} />
          <FixedLabelTextarea control={control} label={'소개'} name={'bio'} placeholder={'자신을 소개해 주세요.'} />
          <SquareButton type={'submit'} content={'수정하기'} onClick={handleSubmit(onSubmit)} />
        </Form>
      </MainContentZone>
    </Base>
  );
};

export default ProfileEdit;

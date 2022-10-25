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
import SquareSubmitButton from '@components/common/buttons/SquareSubmitButton';
import { Base, Form, MainContentZone } from '@pages/PostsNew';

interface IForm {
  nickname: string;
  bio: string;
  profile_image_url: any;
}

const ProfileEdit = () => {
  const navigator = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { data: md } = useSWR<IUser>('/users/me', fetcher);
  const { control, handleSubmit, setValue, watch } = useForm<IForm>({
    defaultValues: {
      nickname: md?.nickname,
      bio: md?.bio,
      profile_image_url: md?.profile_image_url,
    },
  });
  const { nickname } = watch();

  const isSubmitAvailable = Boolean(nickname);

  const onSubmit = useCallback(async (data: IForm) => {
    let filename;
    if (typeof data.profile_image_url === 'string') {
      filename = data.profile_image_url;
    } else {
      filename = await axios.post(
        '/profile/image',
        { image: makeFormData('profile_image_url', data.profile_image_url[0]) },
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
    }

    console.log('uuid filename>>>', filename);
    // const newPost = await axios.patch('/profile/info', { ...data, profile_image_url: filename });
    // console.log(newPost);
  }, []);

  useEffect(() => {
    if (md) {
      setValue('nickname', md.nickname);
      setValue('bio', md.bio);
      // setValue('profile_image_url', md.profile_image_url);
    }
  }, [md]);

  return (
    <Base>
      <TitleNavigation onClickPrev={handleNavigate(navigator, `/${md?.id}`)} title={'내 프로필 수정하기'} />
      <MainContentZone>
        <Form>
          <ProfileImageInput control={control} name={'profile_image_url'} />
          <FixedLabelInput control={control} label={'닉네임'} name={'nickname'} />
          <FixedLabelTextarea control={control} label={'소개'} name={'bio'} placeholder={'자신을 소개해 주세요.'} />
          <SquareSubmitButton onClick={handleSubmit(onSubmit)} content={'수정하기'} valid={isSubmitAvailable} />
        </Form>
      </MainContentZone>
    </Base>
  );
};

export default ProfileEdit;

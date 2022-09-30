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
  nickname: string;
  bio: string;
  profile_image: any;
}

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { nickname } = useParams<{ nickname: string }>();
  // const { data: ud, mutate: postMutate } = useSWR(`/users/${nickname}`, fetcher);
  const ud = { id: 1, nickname: '아무개', bio: '나는야 아무개', profile_image_url: '/public/1.png' };

  const { control, handleSubmit, setValue } = useForm<IForm>({
    defaultValues: {
      nickname: '',
      bio: '',
      profile_image: '/public/1.png',
    },
  });

  useEffect(() => {
    (() => {
      if (ud) {
        setValue('nickname', ud?.nickname);
        setValue('bio', ud?.bio);
        setValue('profile_image', ud?.profile_image_url);
      }
    })();
  }, [ud]);

  const makeFormData = useCallback((name: string, file) => {
    const formData = new FormData();
    formData.append(name, file);
    return formData;
  }, []);

  // 이미지, 나머지 컨텐트 분리

  const onSubmit = handleSubmit(
    useCallback(async (data: IForm) => {
      const filename = await axios.post(`/users/${nickname}/images`, makeFormData('image', data.profile_image), {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const newPost = await axios.post('/posts', { ...data, image: filename?.data ?? null });
      console.log(newPost.data);
    }, []),
  );

  return (
    <Base>
      <PrevButtonTitleHeader title="프로필 편집" onClick={() => navigate('/')} />
      <MainContentZone>
        <Form onSubmit={onSubmit}>
          <ProfileImageInput control={control} name={'profile_image'} />
          <FixedLabelInput control={control} label={'닉네임'} name={'nickname'} />
          <FixedLabelTextarea control={control} label={'소개'} name={'bio'} />
          <SquareButton type={'submit'} content={'수정하기'} onClick={onSubmit} />
        </Form>
      </MainContentZone>
    </Base>
  );
};

export default ProfileEdit;

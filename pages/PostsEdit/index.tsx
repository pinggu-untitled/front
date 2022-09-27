import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import PrevButtonTitleHeader from '@components/common/headers/PrevButtonTitleHeader';
import { useNavigate } from 'react-router-dom';
import ToggleButtonInput from '@components/common/inputs/ToggleButtonInput';
import FixedLabelInput from '@components/common/inputs/FixedLabelInput';
import FixedLabelTextarea from '@components/common/textareas/FixedLabelTextarea';
import SquareButton from '@components/common/buttons/SquareButton';
import ImageInputList from '@components/Posts/ImageInputList';
import axios from 'axios';

export const Base = styled.div`
  width: 100%;
`;

export const MainContentZone = styled.div`
  width: 440px;
  margin-top: 73px;
  padding: 20px 20px 0 20px;
`;

export const Form = styled.form`
  & label {
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
  content: string;
  is_private: boolean;
  images: any[];
  longitude: string;
  latitude: string;
  hashtags: { content: string }[];
  mentions: { receiver: number }[];
}

const PostsEdit = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<IForm>({
    defaultValues: {
      title: '',
      content: '',
      images: [],
      is_private: false,
      longitude: '111.111111',
      latitude: '222.222222',
      hashtags: [{ content: 'hello' }, { content: 'hello2' }],
      mentions: [{ receiver: 1 }, { receiver: 2 }],
    },
  });

  const handleFormData = useCallback((name: string, files: any[]) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(name, files[i]);
    }
    return formData;
  }, []);

  const onSubmit = handleSubmit(
    useCallback(async (data: IForm) => {
      let filenames;
      if (data.images.length >= 1) {
        filenames = await axios.post('/posts/images', handleFormData('images', data.images), {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      const newPost = await axios.post('/posts', { ...data, images: filenames?.data ?? [] });
      console.log(newPost.data);
    }, []),
  );

  return (
    <Base>
      <PrevButtonTitleHeader title="게시물 편집" onClick={() => navigate('/')} />
      <MainContentZone>
        <Form onSubmit={onSubmit}>
          <ImageInputList control={control} name={'images'} />
          <FixedLabelInput control={control} label={'글 제목'} name={'title'} />
          <FixedLabelTextarea control={control} label={'게시글 내용'} name={'content'} onSubmit={onSubmit} />
          <ToggleButtonInput control={control} name={'is_private'} />
          <SquareButton type={'submit'} content={'공유하기'} onClick={onSubmit} />
        </Form>
      </MainContentZone>
    </Base>
  );
};

export default PostsEdit;

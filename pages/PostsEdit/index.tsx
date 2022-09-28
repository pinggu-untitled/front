import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import PrevButtonTitleHeader from '@components/common/headers/PrevButtonTitleHeader';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ToggleButtonInput from '@components/common/inputs/ToggleButtonInput';
import FixedLabelInput from '@components/common/inputs/FixedLabelInput';
import FixedLabelTextarea from '@components/common/textareas/FixedLabelTextarea';
import SquareButton from '@components/common/buttons/SquareButton';
import ImageInputList from '@components/Posts/ImageInputList';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

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

interface IPost {
  title: string;
  content: string;
  is_private: number | boolean;
  longitude: string;
  latitude: string;
  images: [];
}

const PostsEdit = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const { data: pd, mutate: postMutate } = useSWR(`/posts/${postId}`, fetcher);
  const { control, handleSubmit, setValue } = useForm<IForm>({
    defaultValues: {
      title: '',
      content: '',
      is_private: false,
      longitude: '',
      latitude: '',
      images: [],
      hashtags: [{ content: 'hello' }, { content: 'hello2' }],
      mentions: [{ receiver: 1 }, { receiver: 2 }],
    },
  });

  useEffect(() => {
    (() => {
      if (pd) {
        setValue('title', pd?.post.title);
        setValue('content', pd?.post.content);
        setValue('images', pd?.files);
        setValue('is_private', pd?.post.is_private || false);
        setValue('longitude', pd?.post.longitude);
        setValue('latitude', pd?.post.latitude);
      }
    })();
  }, [pd]);

  const makeFormData = useCallback((name: string, files: any[]) => {
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
        filenames = await axios.post('/posts/images', makeFormData('images', data.images), {
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
          <div>
            더 필요한 것: 마이핑스, 위치 수정, is_private 수정, mention/hashtag 추가하고 submit, 포스트(3), 겟(2)
          </div>
        </Form>
      </MainContentZone>
    </Base>
  );
};

export default PostsEdit;

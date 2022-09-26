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
  & label:not(:first-of-type) {
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
  isPrivate: boolean;
  images: any[];
  longitude: string;
  latitude: string;
  hashtags: { content: string }[];
  mentions: { userId: number }[];
  myPings: { id: number }[];
}

const PostsNew = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<IForm>({
    defaultValues: {
      title: '',
      content: '',
      images: [],
      isPrivate: false,
      longitude: '',
      latitude: '',
      hashtags: [{ content: 'hello' }, { content: 'hello2' }],
      mentions: [{ userId: 1 }, { userId: 2 }],
      myPings: [{ id: 1 }, { id: 2 }],
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
        filenames = await axios.post('/posts/images', data.images, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      axios.post('/posts', { data, images: filenames }).then((res) => {
        console.log(res.data);
      });
    }, []),
  );

  return (
    <Base>
      <PrevButtonTitleHeader title="게시물 생성" onClick={() => navigate('/')} />
      <MainContentZone>
        <Form>
          <FixedLabelInput control={control} label={'글 제목'} name={'title'} />
          <FixedLabelTextarea control={control} label={'게시글 내용'} name={'content'} onSubmit={onSubmit} />
          <ImageInputList control={control} name={'files'} />
          <ToggleButtonInput control={control} name={'isPrivate'} />

          <SquareButton type={'submit'} content={'공유하기'} onClick={onSubmit} />
        </Form>
      </MainContentZone>
    </Base>
  );
};

export default PostsNew;

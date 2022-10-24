import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FixedLabelInput from '@components/common/inputs/FixedLabelInput';
import FixedLabelTextarea from '@components/common/textareas/FixedLabelTextarea';
import ImageInputList from '@components/revised/PostsNewEdit/ImageInputList';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import TextToggleButtonInput from '@components/common/inputs/TextToggleButtonInput';
import SquareSubmitButton from '@components/common/buttons/SquareSubmitButton';
import ToolBox from '@components/revised/PostsNewEdit/ToolBox';
import ToolButton from '@components/revised/PostsNewEdit/ToolBox/ToolButton';
import { BsImages } from 'react-icons/bs';
import { HiLocationMarker } from 'react-icons/hi';
import HoverLabel from '@components/common/labels/HoverLabel';
import SearchLocationForm from '@components/revised/PostsNewEdit/SearchLocationForm';
import makeFormData from '@utils/makeFormData';
import ProfileSummaryBar from '@components/revised/PostsNewEdit/ProfileSummaryBar';
import findMatches from '@utils/findMatches';
import TitleNavigation from '@components/revised/common/navigations/TitleNavigation';
import handleNavigate from '@utils/handleNavigate';

export const Base = styled.div`
  width: 100%;
`;

export const MainContentZone = styled.div`
  width: 440px;
  margin-top: 73px;
  padding: 20px 20px 0 20px;
  overflow: scroll;
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

export const Private = styled.label`
  display: flex;
  align-items: center;

  > span {
    font-size: 14px;
    margin-right: 5px;
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

const PostsNew = () => {
  const navigator = useNavigate();
  const { data: ud, mutate: mutateUd } = useSWR(`/users/me`, fetcher);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      title: '',
      content: '',
      images: [],
      is_private: false,
      longitude: '126.111111',
      latitude: '37.222222',
      hashtags: [{ content: 'hello' }, { content: 'hello2' }],
      mentions: [{ receiver: 1 }, { receiver: 2 }],
    },
  });

  const [showOptions, setShowOptions] = useState<{ [key: string]: any }>({
    showImages: false,
    showSearchLocation: false,
  });

  const toggleOption = useCallback((option) => {
    setShowOptions((p) => ({ ...p, [option]: !p[option] }));
  }, []);

  const { title, images, longitude, latitude } = watch();

  const isSubmitAvailable = Boolean(title) && Boolean(longitude) && Boolean(latitude);
  const onSubmit = handleSubmit(
    useCallback(async (data: IForm) => {
      let filenames;
      if (data.images.length > 0) {
        filenames = await axios
          .post('/posts/images', makeFormData('images', data.images), {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((res) => res.data);
      }

      const hashtags = findMatches(data.content, /#[^\s#]+/g, (tag, i) => {
        tag.slice(1);
        return { content: tag };
      });

      const mentions = findMatches(data.content, /@[^\s@]+/g, (mt, i) => {
        mt.slice(1);
        return { receiver: 1 };
      });

      const newPost = await axios
        .post('/posts', { ...data, hashtags, mentions, images: filenames || [] })
        .then((res) => {
          return res.data;
        });

      console.log('newPost', newPost);
      if (newPost) navigator('/');
    }, []),
  );

  return (
    <Base>
      {showOptions.showSearchLocation ? (
        <>
          {/*<PrevButtonTitleHeader*/}
          {/*  title="위치 찾기"*/}
          {/*  onClick={() => {*/}
          {/*    navigate('/posts/new');*/}
          {/*    toggleOption('showSearchLocation');*/}
          {/*  }}*/}
          {/*/>*/}
          <TitleNavigation
            onClickPrev={() => {
              navigator('/posts/new');
              toggleOption('showSearchLocation');
            }}
            title={'위치 찾기'}
          />

          <MainContentZone>
            <SearchLocationForm />
          </MainContentZone>
        </>
      ) : (
        <>
          <TitleNavigation onClickPrev={handleNavigate(navigator, '/')} title={'게시물 만들기'} />
          <MainContentZone>
            <Form>
              <ProfileSummaryBar>
                <TextToggleButtonInput
                  control={control}
                  name={'is_private'}
                  messages={{ checked: '나에게만', unChecked: '모두에게' }}
                />
              </ProfileSummaryBar>
              <FixedLabelInput control={control} label={'글 제목'} name={'title'} />
              <FixedLabelTextarea
                control={control}
                label={'게시글 내용'}
                name={'content'}
                placeholder={`${longitude} ${latitude}에 올릴 게시글 내용을 작성해주세요.`}
              />
              {/*{showOptions.showImages && <ImageInputList control={control} name={'images'} />}*/}
              {/*<ImageInputList control={control} name={'images'} />*/}
              <ToolBox title={'게시물에 추가'}>
                <HoverLabel label={'사진'} style={{ top: '-35px' }}>
                  <ToolButton
                    icon={<BsImages />}
                    colors={{ font: '#44bd63', background: images.length >= 1 && '#e3f0d4' }}
                    onClick={() => toggleOption('showImages')}
                  />
                </HoverLabel>
                <HoverLabel label={'위치'} style={{ top: '-35px' }}>
                  <ToolButton
                    icon={<HiLocationMarker />}
                    colors={{ font: '#f5533d', background: longitude && latitude && '#fecbd2' }}
                    onClick={() => toggleOption('showSearchLocation')}
                  />
                </HoverLabel>
              </ToolBox>
              <SquareSubmitButton onClick={onSubmit} content={'공유하기'} valid={isSubmitAvailable} />
            </Form>
          </MainContentZone>
        </>
      )}
    </Base>
  );
};

export default PostsNew;

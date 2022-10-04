import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import PrevButtonTitleHeader from '@components/common/headers/PrevButtonTitleHeader';
import { useNavigate, useParams } from 'react-router-dom';
import FixedLabelInput from '@components/common/inputs/FixedLabelInput';
import FixedLabelTextarea from '@components/common/textareas/FixedLabelTextarea';
import SquareButton from '@components/common/buttons/SquareButton';
import ImageInputList from '@components/Posts/ImageInputList';
import axios from 'axios';
import UserProfileCard from '@components/common/profiles-related/UserProfileCard';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import TextToggleButtonInput from '@components/common/inputs/TextToggleButtonInput';
import SquareSubmitButton from '@components/common/buttons/SquareSubmitButton';
import ToolBox from '@components/Posts/ToolBox';
import ToolButton from '@components/Posts/ToolBox/ToolButton';
import { BsImages } from 'react-icons/bs';
import { HiLocationMarker } from 'react-icons/hi';
import HoverLabel from '@components/common/labels/HoverLabel';
import SearchInput from '@components/common/inputs/SearchInput';
import SearchLocationForm from '@components/Posts/SearchLocationForm';
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

const PostsEdit = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const { data: ud, mutate: mutateUd } = useSWR(`/users/me`, fetcher);
  const { data: pd, mutate: mutatePd } = useSWR(`/posts/${postId}`, fetcher);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<IForm>({
    defaultValues: {
      title: '',
      content: '',
      images: [],
      is_private: pd?.post.is_private === 1,
      longitude: '',
      latitude: '',
      hashtags: [],
      mentions: [],
    },
  });

  useEffect(() => {
    if (pd) {
      setValue('title', pd?.post.title);
      setValue('content', pd?.post.content);
      setValue(
        'images',
        pd?.post?.Images.map((v: any) => v.src),
      );
      setValue('is_private', pd?.post.is_private === 1);
      setValue('longitude', pd?.post.longitude);
      setValue('latitude', pd?.post.latitude);
      setValue('hashtags', pd?.post.Hashtags);
      setValue('mentions', pd?.post.Mentions);
      setShowOptions((p) => ({ ...p, showImages: pd?.post?.Images.length > 0 }));
    }
  }, [pd]);

  console.log(pd?.post.is_private === 1);

  const { title, images, longitude, latitude } = watch();

  const [showOptions, setShowOptions] = useState<{ [key: string]: any }>({
    showImages: false,
    showSearchLocation: false,
  });

  const toggleOption = useCallback((option) => {
    setShowOptions((p) => ({ ...p, [option]: !p[option] }));
  }, []);

  const isSubmitAvailable = Boolean(title) && Boolean(longitude) && Boolean(latitude);

  const makeFormData = useCallback((name: string, files: any[]) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(name, files[i]);
    }
    return formData;
  }, []);

  const onSubmit = handleSubmit(
    useCallback(async (data: IForm) => {
      // if (!isSubmitAvailable) return;
      let filenames;
      if (data.images.length >= 1) {
        filenames = await axios
          .post('/posts/images', makeFormData('images', data.images), {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((res) => res.data);
      }
      const editedPost = await axios.patch('/posts', { ...data, images: filenames || [] }).then((res) => res.data);
      console.log(editedPost);
    }, []),
  );

  console.log(pd);

  return (
    <Base>
      {showOptions.showSearchLocation ? (
        <>
          <PrevButtonTitleHeader
            title="위치 찾기"
            onClick={() => {
              navigate('/posts/new');
              toggleOption('showSearchLocation');
            }}
          />
          <MainContentZone>
            <SearchLocationForm />
          </MainContentZone>
        </>
      ) : (
        <>
          <PrevButtonTitleHeader title="게시물 편집하기" onClick={() => navigate(`/posts/${postId}`)} />
          <MainContentZone>
            <Form onSubmit={onSubmit}>
              <UserProfileCard user={ud}>
                <TextToggleButtonInput
                  control={control}
                  name={'is_private'}
                  messages={{ checked: '모두에게', unChecked: '나에게만' }}
                />
              </UserProfileCard>
              <FixedLabelInput control={control} label={'글 제목'} name={'title'} />
              <FixedLabelTextarea
                control={control}
                label={'게시글 내용'}
                name={'content'}
                onSubmit={onSubmit}
                placeholder={'작성하고 싶은 게시글을 작'}
              />
              {showOptions.showImages && <ImageInputList control={control} name={'images'} />}
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
              <SquareSubmitButton content={'편집하기'} valid={isSubmitAvailable} />
            </Form>
          </MainContentZone>
        </>
      )}
    </Base>
  );
};

export default PostsEdit;

//  더 필요한 것: 마이핑스, 위치 수정, is_private 수정, mention/hashtag 추가하고 submit, 포스트(3), 겟(2)

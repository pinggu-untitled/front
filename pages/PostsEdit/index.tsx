import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import FixedLabelInput from '@components/common/inputs/FixedLabelInput';
import FixedLabelTextarea from '@components/common/textareas/FixedLabelTextarea';
import ImageInputList from '@components/revised/PostsNewEdit/ImageInputList';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import SquareSubmitButton from '@components/common/buttons/SquareSubmitButton';
import ToolBox from '@components/revised/PostsNewEdit/ToolBox';
import ToolButton from '@components/revised/PostsNewEdit/ToolBox/ToolButton';
import { BsImages } from 'react-icons/bs';
import { HiLocationMarker } from 'react-icons/hi';
import HoverLabel from '@components/common/labels/HoverLabel';
import SearchLocationForm from '@components/revised/PostsNewEdit/SearchLocationForm';
import { IMe, IPost } from '@typings/db';
import TitleNavigation from '@components/revised/common/navigations/TitleNavigation';
import makeFormData from '@utils/makeFormData';
import TextToggleButtonInput from '@components/common/inputs/TextToggleButtonInput';
import ProfileSummaryBar from '@components/revised/PostsNewEdit/ProfileSummaryBar';
import { Base, MainContentZone, Form, IPostForm, makeHashtags, makeMentions } from '@pages/PostsNew';

const PostsEdit = () => {
  const navigator = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const { data: md } = useSWR<IMe>(`/users/me`, fetcher);
  const { data: pd, mutate: mutatePd } = useSWR<IPost>(`/posts/${postId}`, fetcher);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<IPostForm>({
    defaultValues: {
      title: pd?.title || '',
      content: pd?.content || '',
      is_private: pd?.is_private || 0,
      longitude: pd?.longitude || '',
      latitude: pd?.latitude || '',
      images: [],
      hashtags: [],
      mentions: [],
    },
  });

  const { title, longitude, latitude, images } = watch();
  const isSubmitAvailable = Boolean(title) && Boolean(longitude) && Boolean(latitude);
  const [showOptions, setShowOptions] = useState<{ [key: string]: any }>({
    showImages: true,
    showSearchLocation: false,
  });

  const toggleOption = useCallback((option) => {
    setShowOptions((p) => ({ ...p, [option]: !p[option] }));
  }, []);

  const onSubmit = handleSubmit(async (data: IPostForm) => {
    let filenames = [];
    if (data.images.length >= 1) {
      filenames = await axios
        .post('/posts/images', makeFormData('images', data.images), {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => res.data);
    }

    const temp = {
      ...data,
      hashtags: makeHashtags(data.content),
      mentions: makeMentions(data.content),
      images: filenames || [],
    };

    axios
      .patch(`/posts/${postId}`, temp)
      .then((res) => {
        console.log(res.data);
        mutatePd();
        navigator(`/posts/${postId}`);
      })
      .catch((err) => console.error(err));
  });

  useEffect(() => {
    console.log('useEffect start');
    if (pd) {
      setValue('title', pd?.title || '');
      setValue('content', pd?.content || '');
      setValue('is_private', pd?.is_private === 1 || 0);
      setValue('longitude', pd?.longitude || '');
      setValue('latitude', pd?.latitude || '');
      setValue('images', pd?.Images.map((img) => img.src) || '');
      setShowOptions((p) => ({ ...p, showImages: pd?.Images.length > 0 }));
    }
  }, [pd]);

  console.log('rendering 전');

  return (
    <Base>
      {showOptions.showSearchLocation ? (
        <>
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
          <TitleNavigation onClickPrev={() => navigator(-1)} title={'게시물 편집하기'} />
          <MainContentZone>
            <Form onSubmit={onSubmit}>
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
                placeholder={`게시글 내용을 작성해주세요.`}
              />
              {showOptions.showImages && <ImageInputList control={control} name={'images'} />}
              <ToolBox title={'게시물에 추가'}>
                <HoverLabel label={'사진'} style={{ top: '-35px' }}>
                  <ToolButton
                    icon={<BsImages />}
                    colors={{ font: '#44bd63', background: images?.length >= 1 && '#e3f0d4' }}
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

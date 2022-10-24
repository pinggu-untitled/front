import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
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
  content: string;
  is_private: boolean | number;
  images: any;
  longitude: string;
  latitude: string;
  hashtags: { content: string }[];
  mentions: { receiver: number }[];
}

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
  } = useForm<IForm>({
    defaultValues: {
      title: pd?.title || '',
      content: pd?.content || '',
      images: pd?.Images.map((img) => img.src) || [],
      is_private: pd?.is_private || 0,
      longitude: pd?.longitude || '',
      latitude: pd?.latitude || '',
      hashtags: [],
      mentions: [],
    },
  });

  const { title, images, longitude, latitude } = watch();
  const isSubmitAvailable = Boolean(title) && Boolean(longitude) && Boolean(latitude);
  const [showOptions, setShowOptions] = useState<{ [key: string]: any }>({
    showImages: true,
    showSearchLocation: false,
  });

  const toggleOption = useCallback((option) => {
    setShowOptions((p) => ({ ...p, [option]: !p[option] }));
  }, []);

  const onSubmit = handleSubmit(
    useCallback(async (data: IForm) => {
      let filenames = [];
      if (data.images.length >= 1) {
        filenames = await axios
          .post('/posts/images', makeFormData('images', data.images), {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((res) => res.data);
      }

      const findMatches = (data: string, reg: RegExp, mapFn: (v: string, i: number) => void) => {
        const temp = data?.match(reg) ?? [];
        return temp.map(mapFn);
      };

      const hashtags = findMatches(data.content, /#[^\s#]+/g, (tag, i) => {
        tag.slice(1);
        return { content: tag };
      });

      const mentions = findMatches(data.content, /@[^\s@]+/g, (mt, i) => {
        mt.slice(1);
        return { receiver: 1 };
      });

      const temp = { ...data, hashtags, mentions, images: filenames || [] };

      console.log('temp', temp);

      axios
        .patch(`/posts/${postId}`, temp)
        .then((res) => {
          console.log(res.data);
          mutatePd();
          navigator(`/posts/${postId}`);
        })
        .catch((err) => console.error(err));
    }, []),
  );

  useEffect(() => {
    if (pd) {
      setValue('title', pd?.title || '');
      setValue('content', pd?.content || '');
      setValue('is_private', pd?.is_private === 1 || 0);
      setValue('longitude', pd?.longitude || '');
      setValue('latitude', pd?.latitude || '');
      setValue('images', pd?.Images.map((img) => img.src) || []);
      setShowOptions((p) => ({ ...p, showImages: pd?.Images.length > 0 }));
    }
  }, []);

  //   if (pd?.User.id !== md?.id) navigator('/');
  if (pd === undefined) return <div>로딩중...</div>;

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

              {/* </UserProfileCard> */}
              <FixedLabelInput control={control} label={'글 제목'} name={'title'} />
              <FixedLabelTextarea
                control={control}
                label={'게시글 내용'}
                name={'content'}
                onSubmit={onSubmit}
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

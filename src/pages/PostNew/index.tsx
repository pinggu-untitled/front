import { PageMain } from '@pages/Home/style';
import PageTitleHeader from '@components/headers/PageTitleHeader';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@contexts/SessionContext';
import findMatches from '@utils/findMatches';
import { useForm } from 'react-hook-form';
import { useReducer, useState } from 'react';
import axios from 'axios';
import makeFormData from '@utils/makeFormData';
import { FixedBottom, Form, SubmitButton } from '@pages/MypingsNew/style';
import IsPrivateInput from '@components/PostNew/IsPrivateInput';
import InputController from '@components/PostNew/InputController';
import TextareaController from '@components/PostNew/TextareaController';
import ToolBox from '@components/PostNew/ToolBox';
import HoverLabel from '@components/PostNew/HoverLabel';
import ToolButton from '@components/PostNew/ToolBox/ToolButton';
import { BsImages } from 'react-icons/bs';
import { HiLocationMarker } from 'react-icons/hi';
import ImageInputList from '@components/PostNew/ImageInputList';
import { useMap } from '@contexts/MapContext';

export interface IPostForm {
  title: string;
  content: string;
  is_private: boolean | number;
  longitude: string;
  latitude: string;
  images: any[];
}

export const makeHashtags = (data: string) =>
  findMatches(data, /#[^\s#]+/g, (tag, i) => {
    tag.slice(1);
    return { content: tag };
  });

export const makeMentions = (data: string) =>
  findMatches(data, /@[^\s@]+/g, (mt, i) => {
    mt.slice(1);
    return { receiver: 1 };
  });

const PostNew = () => {
  const { getMyPosition, moveCenterToMe } = useMap();
  const { latitude, longitude } = getMyPosition();
  const navigator = useNavigate();
  const { session } = useSession();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IPostForm>({
    defaultValues: {
      title: '',
      content: '',
      longitude,
      latitude,
      images: [],
    },
  });
  const [isPrivate, togglePrivate] = useReducer((prev) => !prev, false);
  const { title, images } = watch();
  const isSubmitAvailable = Boolean(title) && Boolean(longitude) && Boolean(latitude);

  const [showOptions, setShowOptions] = useState<{ [key: string]: any }>({
    showImages: false,
  });
  const [showPreview, setShowPreview] = useState(false);

  const toggleShowPreview = () => setShowPreview((p) => !p);
  const toggleOption = (option: string) => {
    if (option === 'showSearchLocation') moveCenterToMe();
    setShowOptions((p) => ({ ...p, [option]: !p[option] }));
  };

  const onSubmit = handleSubmit(async (data: IPostForm) => {
    let filenames;
    if (data.images.length > 0) {
      filenames = await axios
        .post('/posts/images', makeFormData('images', data.images), {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => res.data);
    }

    const newPost = await axios
      .post('/posts', {
        ...data,
        is_private: isPrivate,
        hashtags: makeHashtags(data.content),
        mentions: makeMentions(data.content),
        images: filenames || [],
      })
      .then((res) => {
        return res.data;
      });

    navigator(`/${session?.id}`);
  });

  return (
    <>
      <PageTitleHeader title={'????????? ?????????'} />
      <PageMain style={{ bottom: '70px' }}>
        <Form style={{ overflow: 'scroll' }}>
          <IsPrivateInput value={isPrivate} onChange={togglePrivate} />
          <InputController control={control} label={'??? ??????'} name={'title'} />
          <TextareaController
            control={control}
            label={'????????? ??????'}
            name={'content'}
            placeholder={`${longitude} ${latitude}??? ?????? ????????? ????????? ??????????????????.`}
          />
          {showOptions.showImages && <ImageInputList control={control} name={'images'} />}
          <ToolBox title={'???????????? ??????'}>
            <HoverLabel label={'??????'} style={{ top: '-35px' }}>
              <ToolButton
                icon={<BsImages />}
                colors={{
                  font: '#44bd63',
                  background: images.length >= 1 && '#e3f0d4',
                }}
                onClick={() => toggleOption('showImages')}
              />
            </HoverLabel>
            <HoverLabel label={'??? ?????????'} style={{ top: '-35px' }}>
              <ToolButton
                icon={<HiLocationMarker />}
                colors={{
                  font: '#f5533d',
                  background: longitude && latitude && '#fecbd2',
                }}
                onClick={() => toggleOption('showSearchLocation')}
              />
            </HoverLabel>
          </ToolBox>
          <FixedBottom>
            {/*{showPreview && (*/}
            {/*  <ShortPreview*/}
            {/*    toggleShow={toggleShowPreview}*/}
            {/*    message={'?????? ??????????????? ?????????????????????!'}*/}
            {/*    data={{ title, category, isPrivate, posts }}*/}
            {/*  />*/}
            {/*)}*/}
            <SubmitButton onClick={onSubmit} disabled={!isSubmitAvailable}>
              ??????
            </SubmitButton>
          </FixedBottom>
        </Form>
      </PageMain>
    </>
  );
};

export default PostNew;

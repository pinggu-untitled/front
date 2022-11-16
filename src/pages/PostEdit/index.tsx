import { PageMain } from '@pages/Home/style';
import PageTitleHeader from '@components/headers/PageTitleHeader';
import { useCallback, useEffect, useState } from 'react';
import IsPrivateInput from '@components/PostNew/IsPrivateInput';
import { FixedBottom, Form, SubmitButton } from '@pages/MypingsNew/style';
import { useSession } from '@contexts/SessionContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IPostForm, makeHashtags, makeMentions } from '@pages/PostNew';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import makeFormData from '@utils/makeFormData';
import InputController from '@components/PostNew/InputController';
import ImageInputList from '@components/PostNew/ImageInputList';
import ToolBox from '@components/PostNew/ToolBox';
import HoverLabel from '@components/PostNew/HoverLabel';
import ToolButton from '@components/PostNew/ToolBox/ToolButton';
import { BsImages } from 'react-icons/bs';
import { HiLocationMarker } from 'react-icons/hi';
import TextareaController from '@components/PostNew/TextareaController';
import { IImage } from '@typings/db';

const PostEdit = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const { data: Post } = useSWR(`/posts/${postId}`, fetcher);
  const { session } = useSession();
  const { control, handleSubmit, watch, setValue } = useForm<IPostForm>({
    defaultValues: {
      title: '',
      content: '',
      longitude: '126.111111',
      latitude: '37.222222',
      images: [],
    },
  });

  const [isPrivate, setIsPrivate] = useState(false);
  const togglePrivate = () => setIsPrivate((p) => !p);

  const { title, longitude, latitude, images } = watch();
  const isSubmitAvailable = Boolean(title) && Boolean(longitude) && Boolean(latitude);
  const [showOptions, setShowOptions] = useState<{ [key: string]: any }>({
    showImages: true,
  });

  const toggleOption = useCallback((option: string) => {
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
      is_private: isPrivate === true ? 1 : 0,
      images: filenames,
    };

    axios
      .patch(`/posts/${postId}`, temp)
      .then((res) => {
        console.log(res.data);
        // mutatePd();
        navigate(`/posts/${postId}`);
      })
      .catch((err) => console.error(err));
  });

  useEffect(() => {
    if (Post) {
      setValue('title', Post?.title || '');
      setValue('content', Post?.content || '');
      setValue('longitude', Post?.longitude || '');
      setValue('latitude', Post?.latitude || '');
      setValue('images', Post?.Images?.map((img: IImage) => img.src) || []);
      setShowOptions((p) => ({ ...p, showImages: Post?.Images.length > 0 }));
      setIsPrivate(Post?.is_private);
    }
  }, []);

  return (
    <>
      <PageTitleHeader title={'게시물 수정하기'} />
      <PageMain style={{ bottom: '70px' }}>
        <Form>
          <IsPrivateInput value={isPrivate} onChange={togglePrivate} />
          <InputController control={control} label={'글 제목'} name={'title'} />
          <TextareaController control={control} label={'내용'} name={'content'} />
          {showOptions.showImages && <ImageInputList control={control} name={'images'} />}
          <ToolBox title={'게시물에 추가'}>
            <HoverLabel label={'사진'} style={{ top: '-35px' }}>
              <ToolButton
                icon={<BsImages />}
                colors={{
                  font: '#44bd63',
                  background: images?.length >= 1 && '#e3f0d4',
                }}
                onClick={() => toggleOption('showImages')}
              />
            </HoverLabel>
            <HoverLabel label={'위치'} style={{ top: '-35px' }}>
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
            <SubmitButton onClick={onSubmit} disabled={!isSubmitAvailable}>
              수정하기
            </SubmitButton>
          </FixedBottom>
        </Form>
      </PageMain>
    </>
  );
};

export default PostEdit;

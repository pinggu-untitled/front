import { PageMain } from '@pages/Home/style';
import PageTitleHeader from '@components/headers/PageTitleHeader';
import { useCallback, useEffect } from 'react';
import { FixedBottom, Form, SubmitButton } from '@pages/MypingsNew/style';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useForm } from 'react-hook-form';
import makeFormData from '@utils/makeFormData';
import InputController from '@components/PostNew/InputController';
import TextareaController from '@components/PostNew/TextareaController';
import ProfileImageInput from '@components/ProfileEdit/ProfileImageInput';

interface IForm {
  nickname: string;
  bio: string;
  profile_image_url: any;
}

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { data: User } = useSWR(`/users/${userId}`, fetcher);
  const navigator = useNavigate();
  const { control, handleSubmit, setValue, watch } = useForm<IForm>({
    defaultValues: {
      nickname: User?.nickname || '',
      bio: User?.bio || '',
      profile_image_url: User?.profile_image_url || '',
    },
  });
  const { nickname } = watch();

  const isSubmitAvailable = Boolean(nickname);

  const onSubmit = useCallback(async (data: IForm) => {
    let filename;
    if (typeof data.profile_image_url === 'string') {
      filename = data.profile_image_url;
    } else {
      filename = await axios
        .post(
          '/profile/image',
          makeFormData('image', data.profile_image_url[0]),
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
        .then((res) => res.data);
    }

    const editedProfile = await axios
      .patch('/profile/info', { ...data, profile_image_url: filename })
      .then((res) => res.data)
      .catch((err) => console.error(err));

    navigator(`/${userId}`);
  }, []);

  useEffect(() => {
    if (User) {
      setValue('nickname', User.nickname || '');
      setValue('bio', User.bio || '');
      setValue('profile_image_url', User.profile_image_url || '');
    }
  }, [User]);

  return (
    <>
      <PageTitleHeader title={'프로필 수정하기'} />
      <PageMain style={{ bottom: '70px' }}>
        <Form>
          <ProfileImageInput control={control} name={'profile_image_url'} />
          <InputController
            control={control}
            label={'닉네임'}
            name={'nickname'}
          />
          <TextareaController
            control={control}
            label={'소개'}
            name={'bio'}
            placeholder={'자신을 소개해 주세요.'}
          />
          <FixedBottom>
            <SubmitButton
              onClick={handleSubmit(onSubmit)}
              disabled={!isSubmitAvailable}
            >
              수정하기
            </SubmitButton>
          </FixedBottom>
        </Form>
      </PageMain>
    </>
  );
};

export default ProfileEdit;

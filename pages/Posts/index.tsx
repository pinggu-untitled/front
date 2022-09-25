import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import TopNavigation from '@components/Post/TopNavigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const Base = styled.div`
  width: 100%;
  height: 100%;
`;

export const MainContentZone = styled.div`
  padding-top: 73px;
  width: 440px;
  top: 73px;
  bottom: 0;
`;

export const Images = styled.div`
  width: 100%;
  height: 220px;
  border-bottom: 1px solid #dfdfdf;
`;

export const AuthorProfile = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #dfdfdf;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 28px;
    & .nickname {
      font-size: 15px;
      font-weight: 700;
    }
    & .location {
      font-size: 15px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export const ProfileImageButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #dfdfdf;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -25px;
  overflow: hidden;
  background-color: lightgray;
  & img {
    width: 100%;
    height: calc(100vh - 73px - 220px - 80px);
    object-fit: contain;
  }
`;

export const TextZone = styled.div`
  width: 100%;
  height: 100vh;
`;
interface IForm {
  searchQueries: string;
}
const Post = () => {
  const navigate = useNavigate();

  // 게시물 정보 GET

  const { control, handleSubmit } = useForm<IForm>({
    defaultValues: { searchQueries: '' },
  });

  const onSubmit = useCallback((data: IForm) => {
    console.log(data);
  }, []);

  return (
    <Base>
      <TopNavigation onClick={() => navigate('/')} />
      <MainContentZone>
        {/*  이미지 영역 */}
        <Images></Images>
        {/*  사용자 프로필 영역 */}
        <AuthorProfile>
          <ProfileImageButton>
            <img src={'/'} />
          </ProfileImageButton>
          <div className={'info'}>
            <span className={'nickname'}>유저 닉네임</span>
            <span className={'location'}>장소</span>
          </div>
        </AuthorProfile>
        <TextZone></TextZone>
      </MainContentZone>
    </Base>
  );
};

export default Post;

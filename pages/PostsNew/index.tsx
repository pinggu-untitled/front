import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import PrevButtonTitleHeader from '@components/common/headers/PrevButtonTitleHeader';
import { useNavigate } from 'react-router-dom';

export const Base = styled.div`
  width: 100%;
  height: 100%;
`;

export const MainContentZone = styled.div`
  width: 440px;
  bottom: 0;
  margin-top: 73px;
`;

interface IForm {
  searchQueries: string;
}
const PostsNew = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<IForm>({
    defaultValues: { searchQueries: '' },
  });
  const onSubmit = useCallback((data: IForm) => {
    console.log(data);
  }, []);

  return (
    <Base>
      <PrevButtonTitleHeader title="게시물 생성" onClick={() => navigate('/')} />
      <MainContentZone>타임라인 뿌려지는 곳</MainContentZone>
    </Base>
  );
};

export default PostsNew;

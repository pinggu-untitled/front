import { PageMain } from '@pages/Home/style';
import PageTitleHeader from '@components/headers/PageTitleHeader';
import Input from '@components/PostNew/Input';
import useInput from '@hooks/useInput';
import { useEffect, useMemo, useReducer, useState } from 'react';
import IsPrivateInput from '@components/PostNew/IsPrivateInput';
import SelectCategoryInput from '@components/MypingsNew/SelectCategoryInput';
import { FixedBottom, Form, SubmitButton } from '@pages/MypingsNew/style';
import SelectPostsInputs from '@components/MypingsNew/SelectPostsInputs';
import { IUserPost } from '@typings/db';
import ShortPreview from '@components/MypingsNew/ShortPreview';
import { useSession } from '@contexts/SessionContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CATEGORIES = ['📌 일반', '😎 핫플레이스', '📸 포토존', '🧚 힐링', '🏄 액티비티', '🧷 기타'];

const MypingsNew = () => {
  const navigate = useNavigate();
  const { session } = useSession();
  const [isPrivate, togglePrivate] = useReducer((prev) => !prev, false);
  const [title, onChangeTitle] = useInput('');
  const [category, onChangeCategory] = useInput(1);
  const [posts, setPosts] = useState<IUserPost[]>([]);
  const [showPreview, toggleShowPreview] = useReducer((p) => !p, false);
  const onSubmit = (e: any) => {
    e.preventDefault();
    const result = {
      is_private: isPrivate ? 1 : 0,
      title,
      category: +category,
      posts: posts.map((v) => v.id),
    };

    axios.post('/mypings', result).then((res) => {
      console.log('마이핑스 생성 성공', res.data);
      navigate(`/${session?.id}/mypings`);
    });
  };

  const isSubmitAvailable = Boolean(title) && Boolean(category);

  useEffect(() => {
    if (title) toggleShowPreview();
  }, [title]);

  return (
    <>
      <PageTitleHeader title={'마이핑스 만들기'} />
      <PageMain style={{ bottom: '70px' }}>
        <Form style={{ overflow: 'scroll' }}>
          <IsPrivateInput value={isPrivate} onChange={togglePrivate} />
          <Input label={'마이핑스 제목'} value={title} onChange={onChangeTitle} />
          <SelectCategoryInput value={category} onChange={onChangeCategory} />
          <SelectPostsInputs value={posts} setValue={setPosts} />
          <FixedBottom>
            {showPreview && (
              <ShortPreview
                toggleShow={toggleShowPreview}
                message={'이런 마이핑스가 만들어질거에요!'}
                data={{ title, category, isPrivate, posts }}
              />
            )}
            <SubmitButton onClick={onSubmit} disabled={!isSubmitAvailable}>
              완료
            </SubmitButton>
          </FixedBottom>
        </Form>
      </PageMain>
    </>
  );
};

export default MypingsNew;

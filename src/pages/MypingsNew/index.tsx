import { PageMain } from '@pages/Home/style';
import PageTitleHeader from '@components/headers/PageTitleHeader';
import Input from '@components/PostNew/Input';
import useInput from '@hooks/useInput';
import { useEffect, useReducer, useState } from 'react';
import IsPrivateInput from '@components/PostNew/IsPrivateInput';
import SelectCategoryInput from '@components/MypingsNew/SelectCategoryInput';
import { FixedBottom, Form, SubmitButton } from '@pages/MypingsNew/style';
import SelectPostsInputs from '@components/MypingsNew/SelectPostsInputs';
import { IUserPost } from '@typings/db';
import ShortPreview from '@components/MypingsNew/ShortPreview';
import { useSession } from '@contexts/SessionContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CATEGORIES = ['π μΌλ°', 'π ν«νλ μ΄μ€', 'πΈ ν¬ν μ‘΄', 'π§ νλ§', 'π μ‘ν°λΉν°', 'π§· κΈ°ν'];

const MypingsNew = () => {
  const navigate = useNavigate();
  const { session } = useSession();
  const [isPrivate, togglePrivate] = useReducer((prev) => !prev, false);
  const [title, onChangeTitle] = useInput('');
  const [category, onChangeCategory] = useInput(1);
  const [posts, setPosts] = useState<IUserPost[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const toggleShowPreview = () => setShowPreview(false);
  const onSubmit = (e: any) => {
    e.preventDefault();
    const result = {
      is_private: isPrivate ? 1 : 0,
      title,
      category: +category,
      posts: posts.map((v) => v.id),
    };

    axios.post('/mypings', result).then((res) => {
      console.log('λ§μ΄νμ€ μμ± μ±κ³΅', res.data);
      navigate(`/${session?.id}/mypings`);
    });
  };

  const isSubmitAvailable = Boolean(title) && Boolean(category);

  useEffect(() => {
    if (title) setShowPreview(true);
  }, [title]);

  return (
    <>
      <PageTitleHeader title={'λ§μ΄νμ€ λ§λ€κΈ°'} />
      <PageMain style={{ bottom: '70px' }}>
        <Form style={{ overflow: 'scroll' }}>
          <IsPrivateInput value={isPrivate} onChange={togglePrivate} />
          <Input label={'λ§μ΄νμ€ μ λͺ©'} value={title} onChange={onChangeTitle} />
          <SelectCategoryInput value={category} onChange={onChangeCategory} />
          <SelectPostsInputs value={posts} setValue={setPosts} />
          <FixedBottom>
            {showPreview && (
              <ShortPreview
                toggleShow={toggleShowPreview}
                message={'μ΄λ° λ§μ΄νμ€κ° λ§λ€μ΄μ§κ±°μμ!'}
                data={{ title, category, isPrivate, posts }}
              />
            )}
            <SubmitButton onClick={onSubmit} disabled={!isSubmitAvailable}>
              μλ£
            </SubmitButton>
          </FixedBottom>
        </Form>
      </PageMain>
    </>
  );
};

export default MypingsNew;

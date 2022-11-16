import { PageMain } from '@pages/Home/style';
import PageTitleHeader from '@components/headers/PageTitleHeader';
import Input from '@components/PostNew/Input';
import useInput from '@hooks/useInput';
import { useEffect, useState } from 'react';
import IsPrivateInput from '@components/PostNew/IsPrivateInput';
import SelectCategoryInput from '@components/MypingsNew/SelectCategoryInput';
import { FixedBottom, Form, SubmitButton } from '@pages/MypingsNew/style';
import SelectPostsInput from '@components/MypingsNew/SelectPostsInputs';
import { IMyPings, IUserPost } from '@typings/db';
import ShortPreview from '@components/MypingsNew/ShortPreview';
import { useSession } from '@contexts/SessionContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const MypingsEdit = () => {
  const navigate = useNavigate();
  const { mypingsId } = useParams<{ mypingsId: string }>();
  const { session } = useSession();
  const [isPrivate, setIsPrivate] = useState(false);
  const togglePrivate = () => setIsPrivate((p) => !p);
  const [title, onChangeTitle, setTitle] = useInput('');
  const [category, onChangeCategory, setCategory] = useInput(1);
  const [posts, setPosts] = useState<IUserPost[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const toggleShowPreview = () => setShowPreview((p) => !p);
  const { data: Mypings } = useSWR<IMyPings>(`/mypings/${mypingsId}`, fetcher);
  const { data: MypingsPosts } = useSWR<IUserPost[]>(`/mypings/${mypingsId}/posts`, fetcher);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const result = {
      is_private: isPrivate ? 1 : 0,
      title,
      category: +category,
      delPosts: MypingsPosts?.filter((pp) => !posts.map((p) => p.id).includes(pp.id)).map((v) => v.id),
      selPosts: posts.filter((p) => !MypingsPosts?.map((pp) => pp.id).includes(p.id)).map((v) => v.id),
    };

    console.log(result);
    axios.patch(`/mypings/${mypingsId}`, result).then((res) => {
      console.log('마이핑스 생성 성공', res.data);
      navigate(`/${session?.id}/mypings`);
    });
  };

  const isSubmitAvailable = Boolean(title);

  useEffect(() => {
    if (Mypings && MypingsPosts) {
      setIsPrivate(Boolean(Mypings?.is_private));
      setTitle(Mypings?.title);
      setCategory(Mypings?.category);
      setPosts(() => {
        // if (MypingsPosts.length > 0) setShowPreview(true);
        return MypingsPosts;
      });
    }
  }, [Mypings, MypingsPosts]);

  return (
    <>
      <PageTitleHeader title={'마이핑스 수정하기'} />
      <PageMain style={{ bottom: '70px' }}>
        <Form>
          <IsPrivateInput value={isPrivate} onChange={togglePrivate} />
          <Input label={'마이핑스 제목'} value={title} onChange={onChangeTitle} />
          <SelectCategoryInput value={category} onChange={onChangeCategory} />
          <SelectPostsInput value={posts} setValue={setPosts} />
          <FixedBottom>
            {showPreview ? (
              <ShortPreview
                toggleShow={toggleShowPreview}
                message={'마이핑스는 이렇게 수정될거에요!'}
                data={{ title, category, isPrivate, posts }}
              />
            ) : (
              <p
                onClick={toggleShowPreview}
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  paddingBottom: '20px',
                  textDecoration: 'underline',
                }}
              >
                마이핑스 수정본을 확인할래요!
              </p>
            )}
            <SubmitButton onClick={onSubmit} disabled={!isSubmitAvailable}>
              수정하기
            </SubmitButton>
          </FixedBottom>
        </Form>
      </PageMain>
    </>
  );
};

export default MypingsEdit;

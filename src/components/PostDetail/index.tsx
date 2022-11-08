import { useParams } from 'react-router-dom';
import PagePrevHeader from '@components/headers/PagePrevHeader';

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();

  return (
    <>
      <PagePrevHeader />
    </>
  );
};

export default PostDetail;

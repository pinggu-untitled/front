import { CSSProperties, useEffect, useReducer } from 'react';
import toggleMutator from '@utils/toggleMutator';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { Button } from '@components/Home/PostCard/LikeButton/style';
import { IPost, IUserPost } from '@typings/db';
import isIdExisting from '@utils/isIdExisting';
import { useSession } from '@contexts/SessionContext';

interface IProps {
  data: IUserPost | IPost;
  style?: CSSProperties;
}

const LikeButton = ({ data, style }: IProps) => {
  const { session } = useSession();
  const [like, toggleLike] = useReducer((prev: boolean, cur: boolean) => cur, false);

  useEffect(() => {
    toggleLike(isIdExisting(data?.Likers, session));
  }, [data]);

  return (
    <Button onClick={toggleMutator(like ? 'inactive' : 'active', `/posts/${data.id}/liked`, toggleLike)} style={style}>
      {like ? <IoHeart style={{ color: '#f5533d' }} /> : <IoHeartOutline />}
    </Button>
  );
};

export default LikeButton;

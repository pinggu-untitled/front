import { Button } from '@components/Profile/FollowButton/style';
import { CSSProperties, useEffect, useReducer } from 'react';
import toggleMutator from '@utils/toggleMutator';
import { useParams } from 'react-router-dom';

interface IProps {
  isActive: boolean;
  style?: CSSProperties;
}
const FollowButton = ({ isActive, style }: IProps) => {
  const { userId } = useParams();
  const [follow, toggleFollow] = useReducer((prev: boolean, cur: boolean) => cur, isActive);

  useEffect(() => {
    toggleFollow(isActive);
  }, []);

  return (
    <Button onClick={toggleMutator(follow ? 'inactive' : 'active', `/follow/${userId}`, toggleFollow)} style={style}>
      {follow ? '팔로우 취소' : '팔로우'}
    </Button>
  );
};

export default FollowButton;

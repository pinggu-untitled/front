import { Actions } from './style';
import { useNavigate } from 'react-router-dom';
import { useProfilePosts } from '@contexts/ProfilePostsContext';

interface IProps {
  editPageUrl: string;
  onDelete: () => void;
}

const OwnerActionButtons = ({ editPageUrl, onDelete }: IProps) => {
  const navigate = useNavigate();
  const onEditPage = () => navigate(editPageUrl);
  return (
    <Actions onClick={(e) => e.stopPropagation()}>
      <button onClick={onEditPage}>수정</button>
      <button onClick={onDelete} style={{ color: '#f3425e' }}>
        삭제
      </button>
    </Actions>
  );
};

export default OwnerActionButtons;

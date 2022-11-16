import { Actions } from './style';
import { useNavigate } from 'react-router-dom';
import AlarmModal from '@components/Profile/AlarmModal';
import { useReducer, useState } from 'react';

interface IProps {
  editPageUrl: string;
  onDelete: () => void;
}

const OwnerActionButtons = ({ editPageUrl, onDelete }: IProps) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const onEditPage = () => navigate(editPageUrl);
  const [showModal, toggleShowModal] = useReducer((p) => !p, false);
  return (
    <Actions onClick={(e) => e.stopPropagation()}>
      <button onClick={onEditPage}>수정</button>
      <button onClick={toggleShowModal} style={{ color: '#f3425e' }}>
        삭제
      </button>
      <AlarmModal onDelete={onDelete} show={showModal} onCloseModal={toggleShowModal} />
    </Actions>
  );
};

export default OwnerActionButtons;

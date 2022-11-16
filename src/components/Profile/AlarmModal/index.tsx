import Modal from '@components/Modal';
import { ModalContent } from '@components/Profile/AlarmModal/style';
import { Actions } from '@components/Profile/OwnerActionButtons/style';

interface IProps {
  show: boolean;
  onCloseModal: () => void;
  onDelete: any;
}

const AlarmModal = ({ show, onCloseModal, onDelete }: IProps) => {
  return (
    <Modal size={'half'} show={show} onCloseModal={onCloseModal} style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
      <ModalContent>
        <div className={'message'}>삭제를 계속 진행할까요?</div>
        <Actions>
          <button onClick={onCloseModal}>아니요</button>
          <button onClick={onDelete} style={{ color: '#f3425e' }}>
            네
          </button>
        </Actions>
      </ModalContent>
    </Modal>
  );
};

export default AlarmModal;

import { useNavigate } from 'react-router-dom';
import PageHeader from '@components/headers/PageMainHeader';
import {
  MainContentZone,
  LoginButton,
  ActionItemListBig,
  ActionItemBig,
  ActionItemListSmall,
  ActionItemSmall,
} from './style';

const More = () => {
  const navigate = useNavigate();

  return (
    <div>
      <MainContentZone>
        <ActionItemListBig>
          <ActionItemBig aria-hidden="true" onClick={() => navigate('/introduce')}>
            서비스 소개
          </ActionItemBig>
          <ActionItemBig style={{ cursor: 'default' }}>버전 정보</ActionItemBig>
        </ActionItemListBig>
        <ActionItemListSmall>
          <ActionItemSmall>공지사항</ActionItemSmall>
          <ActionItemSmall>고객 센터</ActionItemSmall>
          <ActionItemSmall>정보 수정 제안</ActionItemSmall>
          <ActionItemSmall>이용약관 및 정책</ActionItemSmall>
        </ActionItemListSmall>
      </MainContentZone>
    </div>
  );
};

export default More;

import React, { FC, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import PreviousButton from '@components/common/buttons/PreviousButton';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import SettingsModal from '@components/Post/TopNavigation/SettingsModal';
interface IProps {
  onClick: () => void;
}

export const Header = styled.header`
  position: fixed;
  top: 0;
  width: 440px;
  height: 73px;
  border-bottom: 1px solid #dfdfdf;
  padding: 0 10px 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & h1 {
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 2px);
    font-size: 22px;
    font-weight: 700;
  }
`;

export const ActionItem = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  cursor: pointer;
`;

const PrevButtonHeader: FC<IProps> = ({ onClick }) => {
  const navigate = useNavigate();
  const [showModals, setShowModals] = useState<{ [key: string]: any }>({ showSettingsModal: false });
  const modalHandler = useCallback((modalName: string) => {
    setShowModals((p) => ({ ...p, [modalName]: !p[modalName] }));
  }, []);
  return (
    <>
      <Header>
        <PreviousButton onClick={onClick} />
        <ActionItem onClick={() => modalHandler('showSettingsModal')}>
          <HiOutlineDotsVertical />
        </ActionItem>
      </Header>
      <SettingsModal show={showModals.showSettingsModal} onCloseModal={() => modalHandler('showSettingsModal')} />
    </>
  );
};

export default PrevButtonHeader;

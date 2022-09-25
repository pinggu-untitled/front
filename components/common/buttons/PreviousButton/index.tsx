import React from 'react';
import RoundButton from '@components/common/buttons/RoundButton';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface IProps {
  onClick: () => void;
}

const PreviousButton = ({ onClick }: IProps) => {
  return <RoundButton content={<FiArrowLeft />} style={{ fontSize: '22px' }} onClick={onClick} />;
};

export default PreviousButton;

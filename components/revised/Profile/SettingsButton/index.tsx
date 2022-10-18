import React, { FC, memo, CSSProperties } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { TbSettings } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

interface IProps {
  onClick: () => void;
}

export const Base = styled.div`
  background-color: #fff;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 20px;
  bottom: 20px;
  border: 1px solid #dfdfdf;
  border-radius: 50%;
  font-size: 22px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;
`;
const SettingsButton: FC<IProps> = ({ onClick }) => {
  const navigate = useNavigate();

  return (
    <Base onClick={onClick}>
      <TbSettings />
    </Base>
  );
};

export default memo(SettingsButton);

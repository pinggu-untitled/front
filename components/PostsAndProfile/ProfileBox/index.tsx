import React, { CSSProperties, FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  children: React.ReactNode;
}

export const Base = styled.div`
  width: 100%;
  border-bottom: 1px solid #dfdfdf;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
`;

const ProfileBox: FC<IProps> = ({ children }) => {
  return <Base>{children}</Base>;
};

export default ProfileBox;

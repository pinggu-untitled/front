import React, { FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  data: any;
}

export const Base = styled.div``;

const PreviewCard: FC<IProps> = ({ data }) => {
  return <Base></Base>;
};

export default PreviewCard;

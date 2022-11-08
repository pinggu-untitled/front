import { Tag } from '@components/Profile/CateTag/style';
import { CSSProperties, useMemo } from 'react';
import { CATEGORIES } from '@pages/MypingsNew';

interface IProps {
  cateNumber: number;
  style?: CSSProperties;
}

const CateTag = ({ cateNumber, style }: IProps) => {
  const CATEGORIES = [
    '일반',
    '핫플레이스',
    '포토존',
    '힐링',
    '액티비티',
    '기타',
  ];
  return <Tag style={style}>{CATEGORIES[cateNumber - 1]}</Tag>;
};

export default CateTag;

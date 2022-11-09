import { Tag } from '@components/Profile/PrivateTag/style';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { CSSProperties } from 'react';

const PrivateTag = ({ active, style }: { active: number; style?: CSSProperties }) => {
  if (active === 0) return null;
  return (
    <Tag style={style}>
      <HiOutlineLockClosed />
      Private
    </Tag>
  );
};

export default PrivateTag;

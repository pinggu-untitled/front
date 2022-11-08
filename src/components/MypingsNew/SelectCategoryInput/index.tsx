import { Label } from '@components/MypingsNew/SelectCategoryInput/style';
import useInput from '@hooks/useInput';
import { useEffect, useMemo } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';
import { CATEGORIES } from '@pages/MypingsNew';

interface IProps {
  value: number;
  onChange: (e: any) => void;
}
const SelectCategoryInput = ({ value, onChange }: IProps) => {
  return (
    <Label>
      <span className={'label'}>카테고리</span>
      <div style={{ position: 'relative' }}>
        <select value={value} onChange={onChange}>
          {CATEGORIES.map((cate, i) => (
            <option key={i} value={i + 1} label={CATEGORIES[i]} />
          ))}
        </select>
        <span className={'icon'}>
          <TiArrowSortedDown />
        </span>
      </div>
    </Label>
  );
};

export default SelectCategoryInput;

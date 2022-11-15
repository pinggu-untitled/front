import { ReactNode, useEffect, useReducer, useRef } from 'react';
import { OutletZone, Slider } from './style';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import ProfileMypingsProvider from '@contexts/ProfileMypingsContext';

interface IProps {
  outlet: ReactNode;
  show: boolean;
  toggleShow: any;
}

const OutletModal = ({ outlet, show, toggleShow }: IProps) => {
  return (
    <div>
      <OutletZone isActive={show}>{outlet}</OutletZone>
      <Slider onClick={toggleShow} isActive={show}>
        {show ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </Slider>
    </div>
  );
};
export default OutletModal;

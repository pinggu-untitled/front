import { ReactNode } from 'react';
import { OutletZone, Slider } from './style';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

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

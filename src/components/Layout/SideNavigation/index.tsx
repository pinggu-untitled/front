import { Side, NavItemList } from '@components/Layout/SideNavigation/style';
import { RiHome5Line, RiHome5Fill, RiChat3Fill, RiChat3Line } from 'react-icons/ri';
import { FaRegCompass, FaCompass } from 'react-icons/fa';
import { IoEllipsisHorizontalOutline, IoEllipsisHorizontalSharp } from 'react-icons/io5';
import NavItem from '@components/Layout/SideNavigation/NavItem';
import { useSession } from '@contexts/SessionContext';
import ProfileButtonModal from '@components/Layout/SideNavigation/ProfileButtonModal';
import { FaRegUser, FaUser } from 'react-icons/fa';
// import { useMap } from '@contexts/MapContext';

const SideNavigation = ({ show, toggle }: { show: boolean; toggle: () => void }) => {
  const { session } = useSession();
  // const { moveCenterToMe } = useMap();

  return (
    <Side onClick={!show ? toggle : undefined}>
      <NavItemList>
        <h1>Pinggu</h1>
        <NavItem
          icons={{ outline: <RiHome5Line />, fill: <RiHome5Fill /> }}
          title={'홈'}
          url={'/'}
          // onClick={() => moveCenterToMe()}
        />
        <NavItem
          icons={{
            outline: <FaRegCompass />,
            fill: <FaCompass />,
            style: { fontSize: '20px' },
          }}
          title={'탐색'}
          url={'/explore'}
          // onClick={() => moveCenterToMe()}
        />
        <NavItem icons={{ outline: <RiChat3Line />, fill: <RiChat3Fill /> }} title={'채팅'} url={'/chatrooms'} />
        <NavItem
          icons={{
            outline: <FaRegUser />,
            fill: <FaUser />,
            style: { fontSize: '20px' },
          }}
          title={'마이페이지'}
          url={`/${session?.id}`}
        />
        <NavItem
          icons={{
            outline: <IoEllipsisHorizontalOutline />,
            fill: <IoEllipsisHorizontalSharp />,
          }}
          title={'더보기'}
          url={'/more'}
        />
      </NavItemList>
      <ProfileButtonModal />
    </Side>
  );
};

export default SideNavigation;

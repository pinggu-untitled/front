import { IoMdGrid } from 'react-icons/io';
import { MdBookmarkBorder } from 'react-icons/md';
import { HiOutlineUsers } from 'react-icons/hi';
import { Tap, Taps } from '@components/Profile/TapZone/style';
import { useLocation } from 'react-router-dom';
import { memo } from 'react';

const TapZone = ({ userId }: { userId: string }) => {
  const location = useLocation();
  return (
    <Taps>
      <Tap
        to={`/${userId}`}
        style={({ isActive }) =>
          location.pathname === `/${userId}`
            ? { fontWeight: 700, color: '#191919' }
            : undefined
        }
      >
        <span className={'content'}>
          <IoMdGrid />
          게시물
        </span>
      </Tap>
      <Tap
        to={`/${userId}/mypings`}
        style={({ isActive }) =>
          isActive ? { fontWeight: 700, color: '#191919' } : undefined
        }
      >
        <span className={'content'}>
          <MdBookmarkBorder />
          마이핑스
        </span>
      </Tap>
      <Tap
        to={`/${userId}/friends`}
        style={({ isActive }) =>
          isActive ? { fontWeight: 700, color: '#191919' } : undefined
        }
      >
        <span className={'content'}>
          <HiOutlineUsers />
          친구
        </span>
      </Tap>
    </Taps>
  );
};

export default memo(TapZone);

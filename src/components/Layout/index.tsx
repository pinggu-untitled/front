import { memo, useReducer } from 'react';
import { Outlet } from 'react-router-dom';
import { PageBase } from '@pages/Login/style';
import SideNavigation from '@components/Layout/SideNavigation';
import { MapZone } from './style';
import OutletModal from '@components/Layout/OutletModal';
import Map from '@components/Map';
import { MapProvider } from '@contexts/MapContext';

const Layout = () => {
  const [show, toggleShow] = useReducer((prev) => !prev, true);

  return (
    <PageBase>
      <SideNavigation show={show} toggle={toggleShow} />
      <MapProvider>
        <OutletModal outlet={<Outlet />} show={show} toggleShow={toggleShow} />
        <MapZone>
          <Map />
        </MapZone>
      </MapProvider>
    </PageBase>
  );
};

export default memo(Layout);

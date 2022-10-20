import React, { FC, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../themes/themes';
import MainNavigation from '@components/common/navigations/MainNavigation';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useLocation } from 'react-router-dom';
import Map from '@components/Map/index';
import SideNavigation from '@components/revised/common/navigations/SideNavigation';
import { MapProvider } from '@contexts/map-context';

interface IProps {
  children: React.ReactNode;
}

export const Layout = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const MainPage = styled.main<{ show: boolean }>`
  position: fixed;
  width: 440px;
  left: 68px;
  top: 0;
  min-height: 100vh;
  border-right: 1px solid #dfdfdf;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: ${({ show }) => (show ? '0.3s' : 'none')};
  box-shadow: 15px 0px 15px -10px rgba(0, 0, 0, 0.08);
  z-index: 4000;
  background-color: #fff;
`;

export const SlideButton = styled.div<{ show: boolean }>`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ show }) => (show ? '508px' : '68px')};
  transition: ${({ show }) => show && '0.1s'};
  width: 24px;
  height: 50px;
  border-radius: 0 4px 4px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dfdfdf;
  border-left: none;
  color: gray;
  cursor: pointer;
  background: #fff;
  z-index: 3000;
`;

export const MapZone = styled.div`
  position: fixed;
  right: 0;
  left: 68px;
  top: 0;
  bottom: 0;
  background-color: #fff;
`;

const AppLayout: FC<IProps> = ({ children }) => {
  const location = useLocation();
  const [showPage, setShowPage] = useState(true);
  const onToggle = useCallback(() => {
    setShowPage((p) => !p);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        {['/intro', '/introduce'].includes(location.pathname) ? (
          <div>{children}</div>
        ) : (
          <MapProvider>
            <>
              <SideNavigation />
              <MainPage show={showPage}>{children}</MainPage>
              <MapZone>
                <Map />
              </MapZone>
              <SlideButton show={showPage} onClick={onToggle}>
                {showPage ? <IoIosArrowBack /> : <IoIosArrowForward />}
              </SlideButton>
            </>
          </MapProvider>
        )}
      </Layout>
    </ThemeProvider>
  );
};

export default AppLayout;

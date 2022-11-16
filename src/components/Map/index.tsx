import React, { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useMap } from '@contexts/MapContext';

const Map = () => {
  const { pathname: tab, search } = useLocation();
  const { initializeMap } = useMap();

  /* 현재 위치를 지도의 중심 좌표로 설정 */
  const onSuccess = useCallback(
    ({ coords: { latitude, longitude } }: { coords: { latitude: number; longitude: number } }) => {
      const container = document.getElementById('myMap');
      if (initializeMap && container) {
        const [filter, keyword] = decodeURI(search)
          .match(/((?<=filter=)\w+)|((?<=keyword=).+)/gi)
          ?.toString()
          .split(',') || ['', ''];
        initializeMap(container, latitude, longitude, tab, filter, keyword);
      }
    },
    [tab, search],
  );

  /* 현재 위치를 가져오지 못한 경우 */
  const onError = useCallback(({ message }: { message: string }) => {
    const container = document.getElementById('myMap');
    if (container) container.innerText = `지도를 표시할 수 없습니다. ${message}`;
  }, []);

  /* geolocation을 이용해 현재 위치를 얻음 */
  useEffect(() => {
    navigator?.geolocation.getCurrentPosition(onSuccess, onError);
  }, [tab, search]);

  return (
    <div
      id="myMap"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    ></div>
  );
};
export default Map;

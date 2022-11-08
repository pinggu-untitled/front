import React, { useEffect, useCallback } from 'react';
import { useMap } from '@contexts/MapContext';

const Map = () => {
  const { initializeMap } = useMap();

  /* 현재 위치를 지도의 중심 좌표로 설정 */
  const onSuccess = useCallback(
    ({
      coords: { latitude, longitude },
    }: {
      coords: { latitude: number; longitude: number };
    }) => {
      const container = document.getElementById('myMap');
      if (initializeMap && container) {
        initializeMap(container, latitude, longitude);
      }
    },
    []
  );

  /* 현재 위치를 가져오지 못한 경우 */
  const onError = useCallback((error: any) => {
    const container = document.getElementById('myMap');
    if (container) container.innerText = '지도를 표시할 수 없습니다.';
  }, []);

  /* geolocation을 이용해 현재 위치를 얻음 */
  useEffect(() => {
    navigator?.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return (
    <div
      id='myMap'
      style={{
        width: '100%',
        height: '100%',
      }}
    ></div>
  );
};
export default Map;
import React, { useEffect, useCallback } from 'react';
import { createMap } from '../../utils/pMap';
const { kakao } = window as any;

const Map = () => {
  /* geolocation을 이용해 현재 위치를 얻음 */
  useEffect(() => {
    navigator?.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  /* 현재 위치를 지도의 중심 좌표로 설정 */
  const onSuccess = useCallback(({coords: { latitude, longitude }}) => {
    const container = document.getElementById('myMap');
    const locPosition = new kakao.maps.LatLng(latitude, longitude);
    const options = {
      center: locPosition,
      level: 3,
      disableDoubleClickZoom: true // 더블클릭으로 지도 확대 막기
    };
    createMap(container, options);
  }, []);

  /* 현재 위치를 가져오지 못한 경우 */
  const onError = useCallback(error => {
    const container = document.getElementById('myMap');
    if (container) container.innerText = '지도를 표시할 수 없습니다.';
  }, []);

  return (
    <div id='myMap' style={{
      width: '100vw',
      height: '100vh'
    }}></div>
  );
};
export default Map;
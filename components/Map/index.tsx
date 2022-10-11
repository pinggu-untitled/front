import React, { useEffect, useCallback } from 'react';
const { kakao } = window;

const Map = () => {
  useEffect(() => {
    navigator?.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  const onSuccess = useCallback(({coords: { latitude, longitude }}) => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);
    map.setZoomable(false);
  }, []);

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
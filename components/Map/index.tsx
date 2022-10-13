import React, { useEffect, useCallback } from 'react';
const { kakao } = window as any;

const Map = () => {
  let map: any;
  let marker: any;
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
      level: 3
    };
    map = new kakao.maps.Map(container, options); // 지도 그리기
    map.setZoomable(false); // 확대/축소 막기
    displayMyPosition(locPosition); // 현재 위치에 마커 표시

    /* 지도 클릭 이벤트 등록 */
    map.addListener('click', onClickMap);
  }, []);

  /* 현재 위치를 가져오지 못한 경우 */
  const onError = useCallback(error => {
    const container = document.getElementById('myMap');
    if (container) container.innerText = '지도를 표시할 수 없습니다.';
  }, []);

  /* 지도에 드래그 가능한 마커(현재 위치) 표시 */
  const displayMyPosition = useCallback((locPosition) => {
    marker = new kakao.maps.Marker({
      position: locPosition
    });
    marker.setMap(map);
    marker.setDraggable(true);
  }, []);

  /* 지도 클릭 이벤트 - 드래그 가능한 마커 생성하기 */
  const onClickMap = useCallback(({ latLng }) => {
    marker.setPosition(latLng);
  }, []);

  /* 마커 드래그 이벤트 - dragend 마커 좌표 구하기 */
  

  return (
    <div id='myMap' style={{
      width: '100vw',
      height: '100vh'
    }}></div>
  );
};
export default Map;
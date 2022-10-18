import React, { useEffect, useCallback } from 'react';
import { createMap } from '../../utils/pMap';
const { kakao } = window as any;

const Map = () => {
  /* geolocation을 이용해 현재 위치를 얻음 */
  useEffect(() => {
    navigator?.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  /* 현재 위치를 지도의 중심 좌표로 설정 */
  const onSuccess = useCallback(({ coords: { latitude, longitude } }) => {
    const container = document.getElementById('myMap');
    const locPosition = new kakao.maps.LatLng(latitude, longitude);
    const options = {
      center: locPosition,
      level: 3,
      disableDoubleClickZoom: true, // 더블클릭으로 지도 확대 막기
    };
    createMap(container, options);
  }, []);

  /* 현재 위치를 가져오지 못한 경우 */
  const onError = useCallback((error) => {
    const container = document.getElementById('myMap');
    if (container) container.innerText = '지도를 표시할 수 없습니다.';
  }, []);

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

// import React, { useEffect, useState, useCallback } from 'react';
// const { kakao } = window;

// interface ILocation {
//   loaded: boolean
//   coordinates?: { lat: number, lng: number }
//   error?: { code: number, message: string }
// }

// const Map = () => {
//   const [ location, setLocation ] = useState<ILocation>({
//     loaded: false,
//     coordinates: { lat: 0, lng: 0 }
//   });

//   useEffect(() => {
// 		/* 현재 위치를 구함 */
//     navigator?.geolocation.getCurrentPosition(onSuccess, onError);
//   }, []);

// 	/* 현재 위치를 성공적으로 구하면 location state값 변경 */
//   const onSuccess = useCallback(({coords: { latitude, longitude }}) => {
// 		console.log('lat > ', latitude, 'lng > ', longitude);
// 		setLocation(prev => ({  // 상태 변경
//       loaded: true,
//       coordinates: { lat: latitude, lng: longitude }
//     }));
//     // createMap();  // 지도를 그리는 함수 호출
//   }, [location]);

// 	/* 현재 위치를 구하는데 실패한 경우 */
//   const onError = useCallback(error => {
//     setLocation(prev => ({
//       loaded: true,
//       error
//     }));
//   }, [location]);

// 	/* 카카오 맵 API를 이용해 지도를 그림 */
//   const createMap = useCallback(() => {
//     console.log(location.coordinates?.lat, location.coordinates?.lng);
//     const container = document.getElementById('myMap');
//     const options = {
//       center: new kakao.maps.LatLng(location.coordinates?.lat, location.coordinates?.lng),
//       level: 3
//     };
//     const map = new kakao.maps.Map(container, options);
//     map.setZoomable(false);
//   }, [location]);

//   return (
//     <div id='myMap' style={{
//       width: '100vw',
//       height: '100vh'
//     }}></div>
//   );
// };
// export default Map;

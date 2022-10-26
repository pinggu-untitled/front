import React, { useCallback } from 'react';
import SettingsModal from '@components/revised/SettingsModal';
import SquareButton from '@components/common/buttons/SquareButton';
import { createContext, useContext, useState } from 'react';
const { kakao } = window;

interface IMapContext {
  map: kakao.maps.Map | null;
  myMarker: kakao.maps.Marker | null;
  initializeMap: ((container: HTMLElement, latitude: number, longitude: number) => void) | null;
  moveCenterToPost: ((latitude: number, longitude: number) => void) | null;
}

const MapContext = createContext<IMapContext>({
  map: null,
  myMarker: null,
  initializeMap: (container: HTMLElement, latitude: number, longitude: number) => {},
  moveCenterToPost: (latitude: number, longitude: number) => {},
});

export const MapProvider = ({ children }: { children: React.ReactChild }) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null); // 지도 객체
  const [myMarker, setMyMarker] = useState<kakao.maps.Marker | null>(null); // 내 위치 마커
  // const [center, setCenter] = useState(); // 지도 중심 좌표
  const [postMarker, setPostMarker] = useState<kakao.maps.Marker | null>(null); // 특정 포스트 마커
  const [subMarker, setSubMarker] = useState(); // 중심 좌표 주변 포스트 마커

  /* 지도 및 마커 초기화 - 지도 생성, 중심 좌표를 내 위치로 설정, 내 위치 마커 생성 및 표시 */
  const initializeMap = (container: HTMLElement, latitude: number, longitude: number) => {
    console.log('Map Initialized!!!!!@@@@!!!!!!');
    const position = new kakao.maps.LatLng(latitude, longitude);
    const options = {
      center: position,
      level: 3,
      disableDoubleClickZoom: true,
    };
    /* 지도 생성 */
    setMap((prev) => {
      const newMap = new kakao.maps.Map(container, options);
      newMap.setZoomable(false);

      /* 내 위치 마커 생성 */
      setMyMarker((prev) => {
        const newMyMarker = new kakao.maps.Marker({ position, clickable: true });
        newMyMarker.setMap(newMap);
        newMyMarker.isClicked = false;
        // 지도 클릭 시 내 위치 마커 이동
        newMap.addListener('click', ({ latLng }: { latLng: kakao.maps.LatLng }) => {
          newMyMarker.setPosition(latLng);
        });
        // 내 위치 마커 클릭 시 게시물 작성하기 모달 띄우기
        newMyMarker.addListener('click', () => {
          // 게시물 작성 모달
          const content = `
            <div>
              <ul>
                <li>안녕하시오.</li>
                <li>안녕하가시오.</li>
              </ul>
            </div>
          `;
          const overlay = new kakao.maps.CustomOverlay({
            position,
            content,
          });
          overlay.setMap(newMap);
        });
        return newMyMarker;
      });

      /* 특정 포스트 마커 생성 */
      setPostMarker((prev) => {
        const newPostMarker = new kakao.maps.Marker({ position: new kakao.maps.LatLng(0, 0), clickable: true });
        return newPostMarker;
      });

      return newMap;
    });
  };

  /* 특정 포스트 위치로 지도 중심 좌표 변경 */
  const moveCenterToPost = (latitude: number, longitude: number) => {
    const position = new kakao.maps.LatLng(latitude, longitude);
    if (map && postMarker) {
      map.setCenter(position);
      postMarker.setPosition(position);
      postMarker.setMap(map);
    }
  };

  return (
    <MapContext.Provider value={{ map, myMarker, initializeMap, moveCenterToPost }}>{children}</MapContext.Provider>
  );
};

export const useMap = () => useContext(MapContext);

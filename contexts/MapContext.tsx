import React, { useCallback } from 'react';
import { createContext, useContext, useState } from 'react';
import { updateNonNullChain } from 'typescript';
const { kakao } = window;

interface IMapContext {
  map: kakao.maps.Map | null;
  myMarker: kakao.maps.Marker | null;
  initializeMap: ((container: HTMLElement, latitude: number, longitude: number) => void) | null;
  moveCenter: ((latitude: number, longitude: number) => void) | null;
}

const MapContext = createContext<IMapContext>({
  map: null,
  myMarker: null,
  initializeMap: (container: HTMLElement, latitude: number, longitude: number) => {},
  moveCenter: (latitude: number, longitude: number) => {},
});

export const MapProvider = ({ children }: { children: React.ReactChild }) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null); // 지도 객체
  const [myMarker, setMyMarker] = useState<kakao.maps.Marker | null>(null); // 내 위치 마커
  // const [center, setCenter] = useState(); // 지도 중심 좌표
  const [postMarker, setPostMarker] = useState(); // 특정 포스트 마커
  const [subMarker, setSubMarker] = useState(); // 중심 좌표 주변 포스트 마커

  /* 지도 초기화 - 지도 생성, 중심 좌표를 내 위치로 설정, 내 위치 마커 생성 및 표시 */
  const initializeMap = (container: HTMLElement, latitude: number, longitude: number) => {
    console.log('Map Initialized!!!!!@@@@!!!!!!');
    const position = new kakao.maps.LatLng(latitude, longitude);
    const options = {
      center: position,
      level: 3,
      disableDoubleClickZoom: true,
    };
    setMap((prev) => {
      const newMap = new kakao.maps.Map(container, options);
      newMap.setZoomable(false);
      setMyMarker((prev) => {
        const newMyMarker = new kakao.maps.Marker({ position });
        newMyMarker.setMap(newMap);
        return newMyMarker;
      });
      return newMap;
    });
  };

  /* 지도 중심 좌표 설정 */
  const moveCenter = (latitude: number, longitude: number) => {
    const latLng = new kakao.maps.LatLng(latitude, longitude);
    if (map) map.setCenter(latLng);
  };

  return <MapContext.Provider value={{ map, myMarker, initializeMap, moveCenter }}>{children}</MapContext.Provider>;
};

export const useMap = () => useContext(MapContext);

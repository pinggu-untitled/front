import React from 'react';
import { createContext, useContext, useState } from 'react';
const { kakao } = window;

interface IMapContext {
  createMap: ((container: HTMLElement, latitude: number, longitude: number) => void) | null;
  createMyMarker: ((latitude: number, longitude: number) => void) | null;
}

const MapContext = createContext<IMapContext>({
  createMap: null,
  createMyMarker: null,
});
let map: kakao.maps.Map;
let myMarker;

export const MapProvider = ({ children }: { children: React.ReactChild }) => {
  // const [map, setMap] = useState();
  // const [myMarker, setMyMarker] = useState();
  const [center, setCenter] = useState();
  const [postMarker, setPostMarker] = useState();
  const [subMarker, setSubMarker] = useState();

  const createMap = (container: HTMLElement, latitude: number, longitude: number) => {
    const position = new kakao.maps.LatLng(latitude, longitude);
    const options = {
      center: position,
      level: 3,
      disableDoubleClickZoom: true,
    };
    map = new kakao.maps.Map(container, options);
    map.setZoomable(false);
  };
  const createMyMarker = (latitude: number, longitude: number) => {
    const position = new kakao.maps.LatLng(latitude, longitude);
    myMarker = new kakao.maps.Marker({ position });
    myMarker.setMap(map);
  };

  return <MapContext.Provider value={{ createMap, createMyMarker }}>{children}</MapContext.Provider>;
};

export const useMap = () => useContext(MapContext);

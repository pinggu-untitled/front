import React, { useCallback } from 'react';
import { createContext, useContext, useState } from 'react';
import { updateNonNullChain } from 'typescript';
const { kakao } = window;

interface IMapContext {
  map: kakao.maps.Map | null;
  myMarker: kakao.maps.Marker | null;
  initializeMap: ((container: HTMLElement, latitude: number, longitude: number) => void) | null;
}

const MapContext = createContext<IMapContext>({
  map: null,
  myMarker: null,
  initializeMap: (container: HTMLElement, latitude: number, longitude: number) => {},
});

export const MapProvider = ({ children }: { children: React.ReactChild }) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [myMarker, setMyMarker] = useState<kakao.maps.Marker | null>(null);
  const [center, setCenter] = useState();
  const [postMarker, setPostMarker] = useState();
  const [subMarker, setSubMarker] = useState();

  const initializeMap = (container: HTMLElement, latitude: number, longitude: number) => {
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

  return <MapContext.Provider value={{ map, myMarker, initializeMap }}>{children}</MapContext.Provider>;
};

export const useMap = () => useContext(MapContext);

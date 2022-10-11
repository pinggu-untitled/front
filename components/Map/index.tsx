import React, { useEffect, useState, useCallback } from 'react';
const { kakao } = window;

interface ILocation {
  loaded: boolean
  coordinates?: { lat: number, lng: number }
  error?: { code: number, message: string }
}

const Map = () => {
  const [ location, setLocation ] = useState<ILocation>({
    loaded: false,
    coordinates: { lat: 0, lng: 0 }
  });

  const onSuccess = useCallback((position: { coords: { latitude: number, longitude: number } }) => {
    setLocation(prev => ({
      loaded: true,
      coordinates: { lat: position.coords.latitude, lng: position.coords.longitude }
    }));
  }, [location]);

  const onError = useCallback((error: { code: number, message: string }) => {
    setLocation(prev => ({
      loaded: true,
      error
    }));
  }, [location]);

  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    }
    const map = new kakao.maps.Map(container, options);
    map.setZoomable(false);

    navigator?.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return (
    <div id='myMap' style={{
      width: '100vw',
      height: '100vh'
    }}></div>
  );
};
export default Map;
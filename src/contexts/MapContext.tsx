import { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import fetcher from '../utils/fetcher';
import { IPost } from '../typings/db';
const { kakao } = window;

interface IMapContext {
  map: kakao.maps.Map | null;
  myMarker: kakao.maps.Marker | null;
  initializeMap: (
    container: HTMLElement,
    latitude: number,
    longitude: number
  ) => void;
  moveCenterToMe: () => void;
  moveCenterToPost: (latitude: number, longitude: number) => void;
  getMapInfo: () => void;
  getSubPosts: (map: kakao.maps.Map) => void;
}

const MapContext = createContext<IMapContext>({
  map: null,
  myMarker: null,
  initializeMap: (
    container: HTMLElement,
    latitude: number,
    longitude: number
  ) => {},
  moveCenterToMe: () => {},
  moveCenterToPost: (latitude: number, longitude: number) => {},
  getMapInfo: () => {},
  getSubPosts: (map: kakao.maps.Map) => {},
});

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null); // 지도 객체
  const [myMarker, setMyMarker] = useState<kakao.maps.Marker | null>(null); // 내 위치 마커
  const [postMarker, setPostMarker] = useState<kakao.maps.Marker | null>(null); // 특정 포스트 마커
  // const [subMarkers, setSubMarkers] = useState(); // 중심 좌표 주변 포스트 마커

  /* 지도 이동 시 지도 범위 내에 등록된 포스트 목록 조회 후 마커로 표시 */
  const getSubPosts = (map: kakao.maps.Map) => {
    const bounds = map?.getBounds();
    const [swLat, swLng] = bounds
      ?.getSouthWest()
      .toString()
      .slice(1, -1)
      .split(',');
    const [neLat, neLng] = bounds
      ?.getNorthEast()
      .toString()
      .slice(1, -1)
      .split(',');
    // console.log(swLat, swLng, neLat, neLng);
    fetcher(
      `/posts/bounds?swLat=${swLat}&swLng=${swLng.trim()}&neLat=${neLat}&neLng=${neLng.trim()}&tab=home`
    )
      .then((posts) => {
        console.log(posts);
        const imageSrc =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
        posts
          .map((post: IPost) => ({
            latlng: new kakao.maps.LatLng(
              Number(post.latitude),
              Number(post.longitude)
            ),
          }))
          .forEach((position: any) => {
            const imageSize = new kakao.maps.Size(24, 35);
            const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
            new kakao.maps.Marker({
              map: map,
              position: position.latlng,
              image: markerImage,
            });
          });
      })
      .catch((err) => console.error(err));
  };

  /* 지도 및 마커 초기화 - 지도 생성, 중심 좌표를 내 위치로 설정, 내 위치 마커 생성 및 표시 */
  const initializeMap = (
    container: HTMLElement,
    latitude: number,
    longitude: number
  ) => {
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
        const newMyMarker = new kakao.maps.Marker({
          position,
          clickable: true,
        });
        newMyMarker.setMap(newMap);
        // event-지도 클릭 시 내 위치 마커 이동
        newMap.addListener(
          'click',
          ({ latLng }: { latLng: kakao.maps.LatLng }) => {
            newMyMarker.setPosition(latLng);
          }
        );
        // event-내 위치 마커 클릭 시 게시물 작성하기 모달 띄우기
        newMyMarker.addListener('click', () => {
          console.log(newMyMarker.getPosition());
          // 게시물 작성 모달
          const content = `
            <div style='background-color: black; color: white;'>
              <ul>
                <li>이것은 테스트</li>
                <li>안녕하시오.</li>
                <li>안녕하가시오.</li>
              </ul>
            </div>
          `;
          const overlay = new kakao.maps.CustomOverlay({
            position: newMyMarker.getPosition(),
            content,
          });
          overlay.setMap(newMap);
        });
        return newMyMarker;
      });

      /* 특정 포스트 마커 생성 */
      setPostMarker((prev) => {
        const newPostMarker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(0, 0),
          clickable: true,
        });
        return newPostMarker;
      });

      // event-지도 이동 시 포스트 조회
      newMap.addListener('dragend', () => getSubPosts(newMap));

      // getSubPosts(newMap);
      return newMap;
    });
  };

  /* 중심 좌표 설정 및 마커 표시 */
  const setMapCenter = (
    latitude: number,
    longitude: number,
    marker: kakao.maps.Marker
  ) => {
    const position = new kakao.maps.LatLng(latitude, longitude);
    if (map && marker) {
      map.setCenter(position);
      marker.setPosition(position);
      marker.setMap(map);
    }
  };

  /* 내 위치로 지도 중심 좌표 변경 with 내 위치 마커 */
  const moveCenterToMe = () => {
    if (map && myMarker) {
      const onSuccess = ({
        coords: { latitude, longitude },
      }: {
        coords: { latitude: number; longitude: number };
      }) => {
        setMapCenter(latitude, longitude, myMarker);
      };
      const onError = (error: any) => {
        console.error(error);
      };
      navigator?.geolocation.getCurrentPosition(onSuccess, onError);
    }
  };

  /* 특정 포스트 위치로 지도 중심 좌표 변경 with 특정 포스트 마커 */
  const moveCenterToPost = (latitude: number, longitude: number) => {
    if (map && postMarker) setMapCenter(latitude, longitude, postMarker);
  };

  /* 지도 정보 얻기 */
  const getMapInfo = () => {
    const bounds = map?.getBounds();
    const swLatLng = bounds?.getSouthWest();
    const noLatLng = bounds?.getNorthEast();
    console.log('bounds >> ', bounds);
    console.log('swLatLng >> ', swLatLng);
    console.log('swLat >> ', typeof swLatLng?.getLat());
    console.log('neLatLng >> ', noLatLng);
  };

  return (
    <MapContext.Provider
      value={{
        map,
        myMarker,
        initializeMap,
        moveCenterToMe,
        moveCenterToPost,
        getMapInfo,
        getSubPosts,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => useContext(MapContext);

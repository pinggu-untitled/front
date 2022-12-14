import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import fetcher from '@utils/fetcher';
import { IPost } from '@typings/db';
import { showPostInfo } from '@utils/showPostInfo';
import debounce from '@utils/debounce';
const { kakao } = window;

interface IMapContext {
  initializeMap: (
    container: HTMLElement,
    latitude: number,
    longitude: number,
    tab: string,
    filter: string,
    keyword: string,
  ) => void;
  moveCenterToMe: () => void;
  moveCenterToPost: (latitude: number, longitude: number) => void;
  getMyPosition: () => { latitude: string; longitude: string };
}

let map: kakao.maps.Map | null;
let myMarker: kakao.maps.Marker | null;
let postMarker: kakao.maps.Marker | null;

const MapContext = createContext<IMapContext>({
  initializeMap: (
    container: HTMLElement,
    latitude: number,
    longitude: number,
    tab: string,
    filter: string,
    keyword: string,
  ) => {},
  moveCenterToMe: () => {},
  moveCenterToPost: (latitude: number, longitude: number) => {},
  getMyPosition: () => ({ latitude: '', longitude: '' }),
});

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [myPosition, setMyPosition] = useState({ latitude: '', longitude: '' });
  const [postPosition, setPostPosition] = useState({
    latitude: '',
    longitude: '',
  });
  const navigate = useNavigate();

  const KMap = kakao.maps;
  const MapMarkEvent = KMap.event;

  /* event handler - subPostMarker에 hover시 인포윈도우 띄우기 */
  const getSubPostInfo = (
    subMarker: kakao.maps.Marker,
    map: kakao.maps.Map | null,
    post: IPost,
    markPosition: kakao.maps.LatLng,
  ) => {
    const infoPosition = new kakao.maps.LatLng(
      Number((markPosition.getLat() + 0.001).toFixed(6)),
      markPosition.getLng(),
    );
    const content = showPostInfo(
      post.title,
      post.Images[0]?.src,
      post.content,
      post.hits,
      post.User.profile_image_url,
      post.User.nickname,
    );
    if (map) {
      const overlay = new kakao.maps.CustomOverlay({
        content,
        map,
        position: infoPosition,
      });
      overlay.setMap(map);
      MapMarkEvent.addListener(subMarker, 'mouseout', () => overlay.setMap(null));
    }
  };

  // /* event handler - 지도 이동 시 지도 범위 내에 등록된 포스트 목록 조회 후 마커로 표시 */
  const getSubPosts = (map: kakao.maps.Map | null, tab: string, filter: string, keyword: string) => {
    const bounds = map?.getBounds();
    const [swLat, swLng] = bounds?.getSouthWest().toString().slice(1, -1).split(',') ?? [];
    const [neLat, neLng] = bounds?.getNorthEast().toString().slice(1, -1).split(',') ?? [];
    // console.log(swLat, swLng, neLat, neLng);
    console.log(filter, keyword);
    if (tab !== '/explore' || (filter && keyword)) {
      fetcher(
        `/posts/bounds?swLat=${swLat}&swLng=${swLng.trim()}&neLat=${neLat}&neLng=${neLng.trim()}&tab=${
          tab !== '/explore' ? 'home' : `explore&filter=${filter}&keyword=${keyword}`
        }`,
      )
        .then((posts) => {
          console.log('MapContext >> ', posts);
          const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
          const imageSize = new kakao.maps.Size(20, 32);
          const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
          posts.forEach((post: IPost) => {
            const position = new kakao.maps.LatLng(Number(post.latitude), Number(post.longitude));
            if (map) {
              const subMarker = new kakao.maps.Marker({
                map,
                position,
                image: markerImage,
              });
              // event - 주변 포스트 마커 hover 시 인포윈도우 띄우기
              MapMarkEvent.addListener(subMarker, 'mouseover', () => getSubPostInfo(subMarker, map, post, position));

              // event - 주변 포스트 마커 클릭 시 포스트 상세 페이지로 이동
              MapMarkEvent.addListener(subMarker, 'click', () => navigate(`/posts/${post.id}`));
            }
          });
        })
        .catch((err) => console.error(err));
    }
  };
  const dGetSubPosts = debounce(getSubPosts, 500);

  /* 지도 및 마커 초기화 - 지도 생성, 중심 좌표를 내 위치로 설정, 내 위치 마커 생성 및 표시 */
  const initializeMap = (
    container: HTMLElement,
    latitude: number,
    longitude: number,
    tab: string,
    filter: string,
    keyword: string,
  ) => {
    console.log(`Map is initialized.`);
    const position = new kakao.maps.LatLng(latitude, longitude);
    const options = {
      center: position,
      level: 3,
      disableDoubleClickZoom: true,
    };
    /* 지도 생성 */
    map = new kakao.maps.Map(container, options);
    map?.setZoomable(false);
    getSubPosts(map, tab, filter, keyword);

    /* 내 위치 마커 생성 */
    myMarker = new kakao.maps.Marker({ position, clickable: true });
    setMyPosition((prev) => ({
      latitude: myMarker?.getPosition().getLat().toFixed(6) ?? '',
      longitude: myMarker?.getPosition().getLng().toFixed(6) ?? '',
    }));

    myMarker?.setMap(map);

    /* 특정 포스트 마커 생성 */
    postMarker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(0, 0),
      clickable: true,
    });
    postMarker?.setZIndex(1);

    // event-지도 클릭 시 내 위치 마커 이동
    MapMarkEvent.addListener(map, 'click', ({ latLng }: { latLng: kakao.maps.LatLng }) => {
      setMyPosition((prev) => ({
        latitude: latLng.getLat().toFixed(6),
        longitude: latLng.getLng().toFixed(6),
      }));
      myMarker?.setPosition(latLng);
    });
    // event-지도 이동 시 포스트 조회
    MapMarkEvent.addListener(map, 'center_changed', () => dGetSubPosts(map, tab, filter, keyword));

    // event-내 위치 마커 클릭 시 게시물 작성하기 모달 띄우기
    MapMarkEvent.addListener(myMarker, 'click', () => {
      navigate('/posts/new');
    });
  };

  /* 중심 좌표 설정 및 마커 표시 */
  const setMapCenter = (latitude: number, longitude: number, marker: kakao.maps.Marker | null) => {
    const position = new kakao.maps.LatLng(latitude, longitude);
    if (map && marker) {
      map.setCenter(position);
      marker.setPosition(position);
      marker.setMap(map);
    }
  };

  /* 내 위치로 지도 중심 좌표 변경 with 내 위치 마커 */
  const moveCenterToMe = useCallback(() => {
    if (map && myMarker) {
      const onSuccess = ({ coords: { latitude, longitude } }: { coords: { latitude: number; longitude: number } }) => {
        setMapCenter(latitude, longitude, myMarker);
        setMyPosition((prev) => ({ latitude: latitude.toFixed(6), longitude: longitude.toFixed(6) }));
      };
      const onError = (error: any) => {
        console.error(error);
      };
      navigator?.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  /* 특정 포스트 위치로 지도 중심 좌표 변경 with 특정 포스트 마커 */
  const moveCenterToPost = useCallback(
    (latitude: number, longitude: number) => {
      if (map && postMarker) {
        const pLat = latitude.toFixed(6);
        const pLng = longitude.toFixed(6);
        if (postPosition.latitude !== pLat && postPosition.longitude !== pLng) {
          setPostPosition((prev) => ({ latitude: pLat, longitude: pLng }));

          postMarker.setMap(null);
          setMapCenter(latitude, longitude, postMarker);
        }
      }
    },
    [postPosition],
  );

  /* 내가 찍은 마커 위치 가져오기 */
  const getMyPosition = useCallback(() => myPosition, [myPosition]);

  return (
    <MapContext.Provider
      value={{
        initializeMap,
        moveCenterToMe,
        moveCenterToPost,
        getMyPosition,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
export const useMap = () => useContext(MapContext);

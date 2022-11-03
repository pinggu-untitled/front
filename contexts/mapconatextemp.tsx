/**
 *
 * 삭제 예정입니다.
 *
 */
// import React, { createContext, useContext, useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import fetcher from '@utils/fetcher';
// import { IPost } from '@typings/db';
// import { showPostInfo } from './infowindow';
// const { kakao } = window;

// interface IMapContext {
//   map: kakao.maps.Map | null;
//   myMarker: kakao.maps.Marker | null;
//   initializeMap: (container: HTMLElement, latitude: number, longitude: number) => void;
//   moveCenterToMe: () => void;
//   moveCenterToPost: (latitude: number, longitude: number) => void;
//   getMyPosition: () => { latitude: string | undefined; longitude: string | undefined };
// }

// const MapContext = createContext<IMapContext>({
//   map: null,
//   myMarker: null,
//   initializeMap: (container: HTMLElement, latitude: number, longitude: number) => {},
//   moveCenterToMe: () => {},
//   moveCenterToPost: (latitude: number, longitude: number) => {},
//   getMyPosition: () => ({ latitude: '', longitude: '' }),
// });

// export const MapProvider = ({ children }: { children: React.ReactChild }) => {
//   const navigate = useNavigate();
//   const [map, setMap] = useState<kakao.maps.Map | null>(null); // 지도 객체
//   const [myMarker, setMyMarker] = useState<kakao.maps.Marker | null>(null); // 내 위치 마커
//   const [postMarker, setPostMarker] = useState<kakao.maps.Marker | null>(null); // 특정 포스트 마커

//   /* event handler - subPostMarker에 hover시 인포윈도우 띄우기 */
//   const getSubPostInfo = (
//     subMarker: kakao.maps.Marker,
//     map: kakao.maps.Map,
//     post: IPost,
//     markPosition: kakao.maps.LatLng,
//   ) => {
//     const infoPosition = new kakao.maps.LatLng((markPosition.getLat() + 0.001).toFixed(6), markPosition.getLng());
//     const content = showPostInfo(
//       post.title,
//       post.Images[0]?.src,
//       post.content,
//       post.hits,
//       post.User.profile_image_url,
//       post.User.nickname,
//     );
//     const overlay = new kakao.maps.CustomOverlay({
//       content,
//       map,
//       position: infoPosition,
//     });
//     overlay.setMap(map);

//     subMarker.addListener('mouseout', () => overlay.setMap(null));
//   };

//   /* event handler - 지도 이동 시 지도 범위 내에 등록된 포스트 목록 조회 후 마커로 표시 */
//   const debounce = (cb: Function, delay: number) => {
//     let timer: any;
//     return (map: kakao.maps.Map) => {
//       if (timer) clearTimeout(timer);
//       timer = setTimeout(cb, delay, map);
//     };
//   };
//   const getSubPosts = (map: kakao.maps.Map) => {
//     const bounds = map.getBounds();
//     const [swLat, swLng] = bounds?.getSouthWest().toString().slice(1, -1).split(',');
//     const [neLat, neLng] = bounds?.getNorthEast().toString().slice(1, -1).split(',');
//     // console.log(swLat, swLng, neLat, neLng);
//     fetcher(`/posts/bounds?swLat=${swLat}&swLng=${swLng.trim()}&neLat=${neLat}&neLng=${neLng.trim()}&tab=home`)
//       .then((posts) => {
//         console.log(posts);
//         const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
//         const imageSize = new kakao.maps.Size(20, 32);
//         const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
//         posts.forEach((post: IPost) => {
//           const position = new kakao.maps.LatLng(Number(post.latitude), Number(post.longitude));
//           const subMarker = new kakao.maps.Marker({
//             map,
//             position,
//             image: markerImage,
//           });
//           // event - 주변 포스트 마커 hover 시 인포윈도우 띄우기
//           subMarker.addListener('mouseover', () => getSubPostInfo(subMarker, map, post, position));
//           // event - 주변 포스트 마커 클릭 시 포스트 상세 페이지로 이동
//           subMarker.addListener('click', () => navigate(`/posts/${post.id}`));
//         });
//       })
//       .catch((err) => console.error(err));
//   };
//   const dGetSubPosts = debounce(getSubPosts, 500);

//   /* 지도 및 마커 초기화 - 지도 생성, 중심 좌표를 내 위치로 설정, 내 위치 마커 생성 및 표시 */
//   const initializeMap = useCallback((container: HTMLElement, latitude: number, longitude: number) => {
//     console.log('Map Initialized!!!!!@@@@!!!!!!');
//     const position = new kakao.maps.LatLng(latitude, longitude);
//     const options = {
//       center: position,
//       level: 3,
//       disableDoubleClickZoom: true,
//     };
//     /* 지도 생성 */
//     setMap((prev) => {
//       const newMap = new kakao.maps.Map(container, options);
//       getSubPosts(newMap);
//       newMap.setZoomable(false);

//       /* 내 위치 마커 생성 */
//       setMyMarker((prev) => {
//         const newMyMarker = new kakao.maps.Marker({ position, clickable: true });
//         newMyMarker.setMap(newMap);
//         // event-지도 클릭 시 내 위치 마커 이동
//         newMap.addListener('click', ({ latLng }: { latLng: kakao.maps.LatLng }) => {
//           newMyMarker.setPosition(latLng);
//         });
//         // event-내 위치 마커 클릭 시 게시물 작성하기 모달 띄우기
//         newMyMarker.addListener('click', () => {
//           console.log(newMyMarker.getPosition());
//           // 게시물 작성 모달
//           const content = `
//             <div style='background-color: black; color: white;'>
//               <ul>
//                 <li>이것은 테스트</li>
//                 <li>안녕하시오.</li>
//                 <li>안녕하가시오.</li>
//               </ul>
//             </div>
//           `;
//           const overlay = new kakao.maps.CustomOverlay({
//             position: newMyMarker.getPosition(),
//             content,
//           });
//           overlay.setMap(newMap);
//         });
//         return newMyMarker;
//       });

//       /* 특정 포스트 마커 생성 */
//       setPostMarker((prev) => {
//         const newPostMarker = new kakao.maps.Marker({ position: new kakao.maps.LatLng(0, 0), clickable: true });
//         newPostMarker.setZIndex(1);
//         return newPostMarker;
//       });

//       /* event-지도 이동 시 포스트 조회 */
//       newMap.addListener('center_changed', () => dGetSubPosts(newMap));
//       // getSubPosts(newMap);
//       return newMap;
//     });
//   }, []);

//   /* 중심 좌표 설정 및 마커 표시 */
//   const setMapCenter = (latitude: number, longitude: number, marker: kakao.maps.Marker) => {
//     const position = new kakao.maps.LatLng(latitude, longitude);
//     if (map && marker) {
//       map.setCenter(position);
//       marker.setPosition(position);
//       marker.setMap(map);
//     }
//   };

//   /* 내 위치로 지도 중심 좌표 변경 with 내 위치 마커 */
//   const moveCenterToMe = useCallback(() => {
//     if (map && myMarker) {
//       const onSuccess = ({ coords: { latitude, longitude } }: { coords: { latitude: number; longitude: number } }) => {
//         setMapCenter(latitude, longitude, myMarker);
//       };
//       const onError = (error: any) => {
//         console.error(error);
//       };
//       navigator?.geolocation.getCurrentPosition(onSuccess, onError);
//     }
//   }, [map, myMarker]);

//   /* 특정 포스트 위치로 지도 중심 좌표 변경 with 특정 포스트 마커 */
//   const moveCenterToPost = useCallback(
//     (latitude: number, longitude: number) => {
//       if (map && postMarker) {
//         postMarker.setMap(null);
//         setMapCenter(latitude, longitude, postMarker);
//       }
//     },
//     [map, postMarker],
//   );

//   /* 내가 찍은 마커 위치 가져오기 */
//   const getMyPosition = useCallback(() => {
//     const myPosition = myMarker?.getPosition();
//     const latitude = myPosition?.getLat().toFixed(6);
//     const longitude = myPosition?.getLng().toFixed(6);
//     console.log('lat >>> ', latitude, 'lng >>> ', longitude);

//     return { latitude, longitude };
//   }, [myMarker]);

//   return (
//     <MapContext.Provider value={{ map, myMarker, initializeMap, moveCenterToMe, moveCenterToPost, getMyPosition }}>
//       {children}
//     </MapContext.Provider>
//   );
// };
// export const useMap = () => useContext(MapContext);

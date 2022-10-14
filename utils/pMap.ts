const { kakao } = window as any;
let map: kakao.maps.Map;
let myPositionMarker: kakao.maps.Marker;

/* 지도와 내 위치 마커 생성하기 */
export const createMap = (container: HTMLElement | null, options: kakao.maps.MapOptions) => {
  if (map) return;
  map = new kakao.maps.Map(container, options);
  map.setZoomable(false);
  myPositionMarker = new kakao.maps.Marker({ position: options.center });
  myPositionMarker.setMap(map);
  myPositionMarker.setDraggable(true);

  map.addListener('click', moveMyPositionMarker);
};

/* 내 위치 마커 이동하기 */
export const moveMyPositionMarker = ({ latLng }: { latLng: kakao.maps.LatLng }) => {
  myPositionMarker.setPosition(latLng);
};

/* 지도 가져오기 */
export const getMap = () => map;

/* 지도 중심 좌표 변경하기 */
export const setMapCenter = (lat: number, lng: number) => {
  const latLng = new kakao.maps.LatLng(lat, lng);
  map.setCenter(latLng);
};



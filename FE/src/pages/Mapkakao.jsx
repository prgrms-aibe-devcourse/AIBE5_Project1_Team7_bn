import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import festivals from "../data/festivals_with_geo.json"; // ✅ 경로는 Map.jsx 위치에 맞게 조절!

// 위도 경도 거리 계산
function haversineMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const toRad = (v) => (v * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// 가짜 데이터(숙박비)
function randomPrice() {
  const min = 70000;
  const max = 150000;
  const step = 5000;
  const count = (max - min) / step;
  return min + Math.floor(Math.random() * (count + 1)) * step;
}

// 가짜 데이터(평점)
function randomRating() {
  const min = 5.0;
  const max = 10.0;
  const step = 0.5;
  const count = (max - min) / step;
  return Number((min + Math.floor(Math.random() * (count + 1)) * step).toFixed(1));
}

// 가짜 데이터(호텔 사진)
const HOTEL_IMAGES = [
  "/images/hotels/hotel1.png",
  "/images/hotels/hotel2.png",
  "/images/hotels/hotel3.png",
  "/images/hotels/hotel4.png",
  "/images/hotels/hotel5.png",
  "/images/hotels/hotel6.png",
  "/images/hotels/hotel7.png",
  "/images/hotels/hotel8.png",
  "/images/hotels/hotel9.png",
  "/images/hotels/hotel10.png",
  "/images/resorts/resort1.png",
  "/images/resorts/resort2.png",
  "/images/resorts/resort3.png",
  "/images/resorts/resort4.png",
  "/images/resorts/resort5.png",
  "/images/resorts/resort6.png",
  "/images/resorts/resort7.png",
  "/images/resorts/resort8.png",
  "/images/resorts/resort9.png",
  "/images/resorts/resort10.png",
];

// 같은 숙소는 항상 같은 이미지가 나오게(추천: seed 기반)
function pickImageByKey(key) {
  const s = String(key ?? "");
  let x = 0;
  for (let i = 0; i < s.length; i++) x = (x * 31 + s.charCodeAt(i)) >>> 0;
  return HOTEL_IMAGES[x % HOTEL_IMAGES.length];
}

function Map() {
  const { state } = useLocation();

  // 백엔드(ai)에서 받은 축제 id(pSeq).
  const festivalId = state?.festivalId;

  // 혹시 안나오면 서울시청 화면 나오게 햇음(디버깅용)
  const query = state?.query ?? "서울시청";
  const radius = state?.radius ?? 2000;

  // 효연님 주신 JSON 퍄일에서 festivalId로 축제 찾기
  const selectedFestival = useMemo(() => {
    if (!festivalId) return null;
    return festivals.find((f) => String(f.pSeq) === String(festivalId)) ?? null;
  }, [festivalId]);

  const [center, setCenter] = useState(null); // {lat,lng,title}
  const [hotels, setHotels] = useState([]); // 주변 숙소 리스트
  const [selectedHotel, setSelectedHotel] = useState(null); // 선택된 숙소(왼쪽 상단 카드)

  // distance | priceAsc | priceDesc | ratingDesc | ratingAsc
  const [sortType, setSortType] = useState("distance");

  useEffect(() => {
    const kakao = window.kakao;
    if (!kakao || !kakao.maps) return;

    kakao.maps.load(() => {
      const container = document.getElementById("map");
      if (!container) return;

      const map = new kakao.maps.Map(container, {
        center: new kakao.maps.LatLng(37.5665, 126.978),
        level: 5,
      });

      const geocoder = new kakao.maps.services.Geocoder();
      const places = new kakao.maps.services.Places();

      let markers = [];
      let infowindows = [];

      const clear = () => {
        markers.forEach((m) => m.setMap(null));
        markers = [];
        infowindows.forEach((iw) => iw.close());
        infowindows = [];
      };

      // marker 클릭 시: 인포윈도우 + (호텔이면) selectedHotel 갱신
      const addMarker = (pos, title, hotelData = null) => {
        const marker = new kakao.maps.Marker({ position: pos, map });
        markers.push(marker);

        const iw = new kakao.maps.InfoWindow({
          content: `<div style="padding:6px 10px;font-size:12px;">${title}</div>`,
        });
        infowindows.push(iw);

        kakao.maps.event.addListener(marker, "click", () => {
          infowindows.forEach((x) => x.close());
          iw.open(map, marker);

          // 호텔 마커 클릭이면 왼쪽 카드도 갱신
          if (hotelData) {
            setSelectedHotel({
              ...hotelData,
              mockImage: pickImageByKey(hotelData.id || hotelData.place_name),
            });
          }
        });

        return marker;
      };

      const showCenterAndSearchHotels = (lat, lng, title) => {
        clear();

        const c = { lat, lng, title };
        setCenter(c);
        setHotels([]);
        setSelectedHotel(null);

        const centerLatLng = new kakao.maps.LatLng(lat, lng);
        map.setCenter(centerLatLng);

        // 센터 마커
        addMarker(centerLatLng, `📍 ${title}`, null);

        places.categorySearch(
          "AD5",
          (data, status) => {
            if (status !== kakao.maps.services.Status.OK || !data?.length) {
              setHotels([]);
              return;
            }

            // 리스트용 데이터 + mock 값 + mockImage(숙소마다 고정)
            const enriched = data.map((h) => ({
              ...h,
              mockPrice: randomPrice(),
              mockRating: randomRating(),
              mockImage: pickImageByKey(h.id || h.place_name),
            }));

            // 지도 마커 표시
            enriched.forEach((p) => {
              const pos = new kakao.maps.LatLng(Number(p.y), Number(p.x));
              addMarker(pos, p.place_name, p);
            });

            setHotels(enriched);
          },
          {
            location: centerLatLng,
            radius,
            sort: kakao.maps.services.SortBy.DISTANCE,
          }
        );
      };

      //  0) festivalId로 찾은 축제가 있고 좌표가 있으면 -> 좌표로 바로 센터 찍기
      if (selectedFestival) {
        const lat = Number(selectedFestival.latitude);
        const lng = Number(selectedFestival.longitude);

        if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
          showCenterAndSearchHotels(lat, lng, selectedFestival.festival_name || query);
          return; // 중요: 아래 주소/키워드 검색 스킵
        }
      }

      //  1) (fallback) 주소 → 좌표
      geocoder.addressSearch(query, (result, status) => {
        if (status === kakao.maps.services.Status.OK && result?.length) {
          const { y, x } = result[0];
          showCenterAndSearchHotels(Number(y), Number(x), query);
          return;
        }

        // 2) (fallback) 키워드 → 좌표
        places.keywordSearch(query, (data, status2) => {
          if (status2 === kakao.maps.services.Status.OK && data?.length) {
            const { y, x, place_name } = data[0];
            showCenterAndSearchHotels(Number(y), Number(x), place_name || query);
          } else {
            alert(`"${query}" 위치를 찾지 못했습니다.`);
          }
        });
      });
    });
  }, [query, radius, selectedFestival]);

  // 리스트에 보여줄 거리 계산 + 정렬 적용
  const hotelList = useMemo(() => {
    if (!center) return [];

    const list = hotels.map((h) => {
      const d =
        h.distance != null
          ? Number(h.distance)
          : Math.round(haversineMeters(center.lat, center.lng, Number(h.y), Number(h.x)));
      return { ...h, _distance: d };
    });

    switch (sortType) {
      case "priceAsc":
        return [...list].sort((a, b) => a.mockPrice - b.mockPrice);
      case "priceDesc":
        return [...list].sort((a, b) => b.mockPrice - a.mockPrice);
      case "ratingDesc":
        return [...list].sort((a, b) => b.mockRating - a.mockRating);
      case "ratingAsc":
        return [...list].sort((a, b) => a.mockRating - b.mockRating);
      case "distance":
      default:
        return [...list].sort((a, b) => a._distance - b._distance);
    }
  }, [hotels, center, sortType]);

  // 버튼 스타일
  const btnStyle = (type) => ({
    padding: "5px 8px",
    fontSize: 12,
    borderRadius: 6,
    border: "1px solid #ccc",
    background: sortType === type ? "#e3f2fd" : "#fff",
    cursor: "pointer",
  });

  // ✅ 화면에 현재 기준(축제 or query) 표시용 라벨
  const 기준라벨 = selectedFestival
    ? `축제: ${selectedFestival.festival_name} (pSeq: ${selectedFestival.pSeq})`
    : `검색어: ${query}`;

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: 12,
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* 왼쪽 리스트 */}
      <div
        style={{
          width: 360,
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 12,
          height: "100%",
          overflow: "auto",
          boxSizing: "border-box",
        }}
      >
        <h3 style={{ margin: "0 0 8px" }}>주변 숙소</h3>

        <div style={{ fontSize: 13, marginBottom: 8 }}>
          {기준라벨}
          <br />
          반경: <b>{radius}m</b>
        </div>

        {/*  선택된 숙소 카드 */}
        {selectedHotel && (
          <div
            style={{
              border: "1px solid #dbeafe",
              background: "#f8fbff",
              borderRadius: 10,
              padding: 10,
              marginBottom: 10,
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 8 }}>선택한 숙소</div>

            <img
              src={selectedHotel.mockImage}
              alt={selectedHotel.place_name}
              style={{
                width: "100%",
                height: 160,
                objectFit: "cover",
                borderRadius: 10,
                border: "1px solid #eee",
              }}
            />

            <div style={{ marginTop: 8, fontWeight: 700 }}>{selectedHotel.place_name}</div>

            <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
              {selectedHotel.road_address_name || selectedHotel.address_name || "-"}
            </div>

            <div style={{ fontSize: 12, marginTop: 6 }}>
              💰 가격: <b>{selectedHotel.mockPrice.toLocaleString()}원</b> ⭐ 평점:{" "}
              <b>{selectedHotel.mockRating.toFixed(1)}</b>
            </div>

            {selectedHotel.place_url && (
              <a
                href={selectedHotel.place_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  fontSize: 12,
                  textDecoration: "none",
                  color: "#1a73e8",
                  fontWeight: 700,
                }}
              >
                카카오맵에서 보기 →
              </a>
            )}
          </div>
        )}

        {/* 정렬 버튼 */}
        <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
          <button style={btnStyle("distance")} onClick={() => setSortType("distance")}>
            거리순
          </button>
          <button style={btnStyle("ratingDesc")} onClick={() => setSortType("ratingDesc")}>
            평점순
          </button>
          <button style={btnStyle("priceAsc")} onClick={() => setSortType("priceAsc")}>
            가격⬆
          </button>
          <button style={btnStyle("priceDesc")} onClick={() => setSortType("priceDesc")}>
            가격⬇
          </button>
        </div>

        {hotelList.length === 0 ? (
          <div style={{ fontSize: 13, color: "#666" }}>숙소를 불러오는 중이거나 결과가 없습니다.</div>
        ) : (
          hotelList.map((h) => (
            <div
              key={h.id}
              onClick={() =>
                setSelectedHotel({
                  ...h,
                  mockImage: pickImageByKey(h.id || h.place_name),
                })
              }
              style={{
                padding: "10px 8px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
                borderRadius: 8,
                background: selectedHotel?.id === h.id ? "#f1f8ff" : "transparent",
              }}
            >
              <div style={{ fontWeight: 700 }}>{h.place_name}</div>

              <div style={{ fontSize: 12, color: "#444", marginTop: 4 }}>
                거리: {(h._distance / 1000).toFixed(2)} km
              </div>

              <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                주소: {h.road_address_name || h.address_name || "-"}
              </div>

              <div style={{ fontSize: 12, marginTop: 4 }}>
                💰 가격: <b>{h.mockPrice.toLocaleString()}원</b>
              </div>

              <div style={{ fontSize: 12, marginTop: 2 }}>
                ⭐ 평점: <b>{h.mockRating.toFixed(1)}</b>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 오른쪽 지도 + 예약 영역 */}
      <div style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
        {/* 지도 */}
        <div
          id="map"
          style={{
            flex: 1,
            width: "100%",
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
        />

        {/* 예약 CTA 영역 */}
        <div
          style={{
            padding: "14px 18px",
            borderRadius: 8,
            border: "1px solid #cce5ff",
            background: "#f5faff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 700 }}>🏨 지금 바로 숙소 예약하기!!</div>

          <a
            href="https://www.agoda.com/ko-kr/?utm_medium=cpc&utm_source=naver&utm_campaign=m.brand&utm_content=brand&utm_term=%EC%95%84%EA%B3%A0%EB%8B%A4&site_id=1755782&tag=90fbe8ca-28c1-4e84-9553-eb0f5e886450&pslc=1&ds=GONOVBHKSE6jE0Rd"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px 14px",
              background: "#1a73e8",
              color: "#fff",
              borderRadius: 6,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            아고다로 이동 →
          </a>
        </div>
      </div>
    </div>
  );
}

export default Map;

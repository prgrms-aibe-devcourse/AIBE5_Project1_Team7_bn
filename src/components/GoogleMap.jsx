import React, { useEffect, useRef } from "react";

// GoogleMap 컴포넌트: 위도/경도 또는 주소로 지도 표시
export default function GoogleMap({ latitude, longitude, rdnmadr, lnmadr, apiKey }) {
  const mapRef = useRef(null);
  useEffect(() => {
    let script;
    function initMap() {
      if (!mapRef.current || !window.google || !window.google.maps) return;
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 16,
        center: latitude && longitude ? { lat: latitude, lng: longitude } : { lat: 37.5665, lng: 126.9780 },
        disableDefaultUI: true,
        gestureHandling: "none",
        clickableIcons: false,
      });
      if (window.google.maps.Marker) {
        if (latitude && longitude) {
          new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map,
          });
        } else if (rdnmadr || lnmadr) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ address: rdnmadr || lnmadr }, (results, status) => {
            if (status === "OK" && results[0]) {
              map.setCenter(results[0].geometry.location);
              new window.google.maps.Marker({
                map,
                position: results[0].geometry.location,
              });
            }
          });
        }
      }
    }
    if (!window.google || !window.google.maps) {
      script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.onerror = () => {
        // 에러 핸들링: 지도 로드 실패 시
        if (mapRef.current) {
          mapRef.current.innerHTML = '<div style="color:red;padding:16px;">지도를 불러올 수 없습니다.</div>';
        }
      };
      script.onload = () => initMap();
      document.body.appendChild(script);
    } else {
      initMap();
    }
    return () => {
      // cleanup: script 태그 제거 (중복 방지)
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [latitude, longitude, rdnmadr, lnmadr, apiKey]);

  // 지도 위에 오버레이로 라벨 추가
  return (
    <div style={{ position: "relative", width: "100%", height: 120, borderRadius: 12, overflow: "hidden", margin: "24px 0", boxShadow: "0 1px 4px 0 rgba(60,64,67,.15)" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        background: "#4285F4",
        color: "white",
        borderRadius: "8px 0 8px 0",
        padding: "4px 8px 4px 8px",
        fontSize: 14,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        gap: 4,
        zIndex: 2,
      }}>
        <span style={{ fontSize: 18, marginRight: 4 }}>🚉</span> 지도에서 보기
      </div>
    </div>
  );
}
